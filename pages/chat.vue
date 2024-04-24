<script setup lang="ts">
  const supabase = useSupabaseClient();
  const store = useMainStore();

  /****************************
   * type
   ***************************/
  type ChatData = {
    id?: number;
    created_at?: string;
    user_name: string;
    message: string;
    user_email?: string;
  };

  /****************************
   * variables
   ***************************/
  const chatPartner = ref<string>("");
  const chatHistoryData = ref<ChatData[]>();
  const chatMainData = ref<ChatData[]>();
  const fetchChatDataFlag = ref<boolean>(true);
  const inputVal = ref<string>("");
  const chatMainView = ref<HTMLElement | null>(null);
  const inputField = ref<HTMLElement | null>(null);
  const dialogVisible = ref<boolean>(false);
  const selectedUser = ref<any>(null);

  /****************************
   * fetch data
   ***************************/
  // Fetch chat data
  const fetchChatData = async () => {
    fetchChatDataFlag.value = false;

    // Fetch from supabase
    const { data, error } = await supabase.from("chat").select("*");
    if (error) {
      console.error("Error fetching chat data:", error.message);
    } else {
      // Set the main chat data and sort by create_at
      chatMainData.value = data?.sort((a: ChatData, b: ChatData) => {
        return (
          new Date(a.created_at!).getTime() - new Date(b.created_at!).getTime()
        );
      });

      // Set the history data that is last message of partner
      chatHistoryDataHandler();

      fetchChatDataFlag.value = true;
    }
  };

  // Insert chat data
  const insertChatData = async (
    user_name: string,
    message: string,
    user_email: string
  ) => {
    const chatData: ChatData = {
      user_name,
      message,
      user_email,
    };

    const { data, error } = await supabase
      .from("chat")
      .insert([chatData] as any)
      .select();

    if (error) {
      console.error("Error inserting chat data:", error.message);
    } else {
      console.log("Chat data inserted successfully:", data);
    }
  };

  // real-time data fetch
  const fetchRealtimeData = () => {
    try {
      supabase
        .channel("connectify") // 任意のチャンネル名
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "chat",
          },
          (payload) => {
            // insert
            if (payload.eventType === "INSERT") {
              const { id, created_at, message, user_name, user_email } =
                payload.new;
              chatMainData.value?.push({
                id,
                created_at,
                message,
                user_name,
                user_email,
              });

              chatHistoryDataHandler();

              setTimeout(() => {
                scrollToBottom();
              }, 500);
            }

            // delete
            if (payload.eventType === "DELETE") {
              const { id } = payload.old;
              chatMainData.value = chatMainData.value?.filter(
                (item) => item.id !== id
              );
            }
          }
        )
        .subscribe();

      // リスナーの解除
      return () => supabase.channel("connectify").unsubscribe();
    } catch (error) {
      console.error(error);
    }
  };

  // Click chat submit button
  const clickChatSubmitBtn = async (e: MouseEvent | KeyboardEvent) => {
    const className = (e.target as HTMLElement)?.classList.value;
    console.log(className);

    if (
      e.ctrlKey ||
      e.metaKey ||
      className.includes("p-button-icon pi pi-send")
    ) {
      // Remove leading whitespace
      inputVal.value = inputVal.value.trim();
      // If the input is empty, return
      if (!inputVal.value) return;

      // Insert chat data
      insertChatData(store.userName!, inputVal.value, store.userEmail!);

      // unfocus the input field
      if (inputField.value) {
        inputField.value.blur();
      }

      // Delete the input value
      inputVal.value = "";
    }
  };
  /****************************
   * helper
   ***************************/
  // Scroll to bottom of chat
  const scrollToBottom = () => {
    chatMainView.value?.scrollTo({
      top: chatMainView.value?.scrollHeight,
      behavior: "smooth",
    });
  };

  const chatHistoryDataHandler = () => {
    chatHistoryData.value = chatMainData.value
      ?.filter((item) => item.user_email !== store.userEmail)
      .sort((a: ChatData, b: ChatData) => {
        return (
          new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime()
        );
      })
      .reduce((acc: ChatData[], current: ChatData) => {
        const x = acc.find((item) => item.user_email === current.user_email);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, [] as ChatData[]);
  };

  /****************************
   * lifecycle
   ***************************/
  onMounted(async () => {
    await fetchChatData();
    fetchRealtimeData();
    scrollToBottom();
  });
</script>

<template>
  <div class="main">
    <Splitter class="chat">
      <SplitterPanel :size="25" :minSize="20">
        <div class="chat-history">
          <div class="chat-history__header">
            <p class="title">メッセージ履歴</p>
            <Button
              class="create-btn"
              label="ルーム作成"
              @click="dialogVisible = true"
            />
          </div>
          <Dialog
            v-model:visible="dialogVisible"
            modal
            header="相手を選択してください"
            class="dialog"
          >
            <Dropdown
              v-model="selectedUser"
              :options="store.authUserInfo"
              filter
              optionLabel="name"
              placeholder="選択してください。"
              class="dialog-dropdown"
            >
              <template #value="slotProps">
                <div v-if="slotProps.value" style="display: flex">
                  <div>{{ slotProps.value.email }}</div>
                </div>
                <span v-else>
                  {{ slotProps.placeholder }}
                </span>
              </template>
              <template #option="slotProps">
                <div style="display: flex">
                  <div>{{ slotProps.option.email }}</div>
                </div>
              </template>
            </Dropdown>
            <Button
              class="dialog-createBtn"
              label="作成"
              :disabled="selectedUser === null"
            />
          </Dialog>
          <!-- skelton -->
          <!-- <ul v-if="fetchChatDataFlag" class="skelton-list">
            <li class="skelton-list__item">
              <div class="item">
                <Skeleton width="20%" class="skelton"></Skeleton>
                <Skeleton width="100%" class="skelton"></Skeleton>
                <Skeleton width="100%" class="skelton"></Skeleton>
              </div>
            </li>
          </ul> -->
          <div
            v-if="chatHistoryData?.length && fetchChatDataFlag"
            class="overflow"
          >
            <div class="overflow-inner">
              <Panel
                v-for="{
                  id,
                  user_name,
                  user_email,
                  message,
                } in chatHistoryData"
                :key="id"
                :header="user_email"
                class="card"
              >
                <p class="message">
                  {{ message }}
                </p>
              </Panel>
            </div>
          </div>
          <p
            v-else-if="!chatHistoryData?.length && fetchChatDataFlag"
            class="no-history"
          >
            チャット履歴はありません。
          </p>
        </div>
      </SplitterPanel>
      <SplitterPanel :size="75" :minSize="40">
        <div class="chat-main">
          <p class="title">メッセージ</p>
          <div
            v-if="chatMainData?.length && fetchChatDataFlag"
            class="overflow"
            ref="chatMainView"
          >
            <div
              v-for="{ id, user_name, user_email, message } in chatMainData"
              :key="id"
              class="chat-card"
              :class="{ 'user-chat': user_email === store.userEmail }"
            >
              <p class="name">{{ user_email }}</p>
              <p class="message">{{ message }}</p>
            </div>
          </div>
          <p
            v-else-if="!chatMainData?.length && fetchChatDataFlag"
            class="no-selected"
          >
            トークルームがまだ選択されていません。
          </p>
          <div class="input-field">
            <div class="input-field__inner">
              <textarea
                v-model="inputVal"
                rows="1"
                cols="30"
                class="textarea"
                ref="inputField"
                maxlength="500"
                @keydown.enter.meta.exact="clickChatSubmitBtn"
              ></textarea>
              <Button
                class="submit-button"
                label=""
                icon="pi pi-send"
                @click="clickChatSubmitBtn"
                :disabled="!inputVal"
              />
            </div>
          </div>
        </div>
      </SplitterPanel>
    </Splitter>
  </div>
</template>

<style lang="scss">
  .chat {
    min-height: calc(100vh - 75px);
    border-radius: 5px;
    background-color: #fff;

    .chat-history {
      padding: 20px;

      &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;

        .title {
          font-size: 16px;
          font-weight: 600;
          color: $primary;
          margin: 0;
        }

        .create-btn {
          font-size: 12px;
          padding: 5px 15px;
          border-radius: 3px;
        }
      }

      .skelton-list {
        margin: 0;
        padding: 0;
        list-style: none;
        padding: 0px 10px 10px 0px;

        .skelton-list__item {
          margin-bottom: 10px;

          .item {
            padding: 10px;
            border-radius: 5px;
            background-color: $bgColor;

            .skelton {
              margin-bottom: 10px;

              &:last-child {
                margin-bottom: 0;
              }
            }
          }
        }
      }

      .overflow {
        overflow-y: scroll;

        &-inner {
          height: calc(100vh - 160px);
          // padding: 0px 10px 10px 0px;

          .card {
            width: 100%;
            margin-bottom: 10px;
            border-radius: 5px;
            cursor: pointer;
            overflow-wrap: break-word;

            &:hover {
              background-color: $buttonFocusColor;
            }

            .message {
              margin: 0;
              font-size: 12px;
            }
          }
        }
      }

      .no-history {
        font-size: 12px;
        margin: 0;
      }
    }

    .chat-main {
      height: 100%;
      position: relative;
      padding: 20px;

      .title {
        font-size: 16px;
        font-weight: 600;
        margin: 0 0 20px 0;
        color: $primary;
      }

      .no-selected {
        font-size: 12px;
        margin: 0;
      }

      .overflow {
        overflow-y: scroll;
        height: calc(100vh - 250px);

        .chat-card {
          width: 45%;
          margin: 0 auto 10px 0;
          border-radius: 5px;
          padding: 10px;
          background-color: $bgColor;
          overflow-wrap: break-word;

          &.user-chat {
            margin: 0 0 10px auto;
            background-color: aliceblue;
          }

          // &:hover {
          //   background-color: $buttonFocusColor;
          // }

          .name {
            font-size: 12px;
            margin: 0 0 5px 0;
            font-weight: 600;
          }

          .message {
            margin: 0;
            font-size: 12px;
            line-height: 1.6;
          }
        }
      }

      .input-field {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 20px;
        background-color: $bgColor;

        &__inner {
          width: 100%;
          position: relative;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 10px;

          textarea {
            width: 100%;
            height: 40px;
            border: 1px solid $borderColor;
            border-radius: 5px;
            overflow: hidden;
            padding: 10px;
            resize: none;
            transition: height 0.3s cubic-bezier(0.19, 1, 0.22, 1);

            &:focus {
              height: 130px;
              overflow-y: scroll;
              transition: height 0.3s cubic-bezier(0.19, 1, 0.22, 1);
            }
          }

          .submit-button {
            position: absolute;
            z-index: 2;
            bottom: 0;
            right: 0;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: transparent;
            color: #333;
            font-size: 20px;
            cursor: pointer;
            border: none;
          }
        }
      }
    }
  }

  //for primevue dialog

  .dialog {
    width: 30%;
    min-width: 400px;

    .dialog-dropdown {
      width: 100%;
      margin-bottom: 10px;
    }

    .dialog-createBtn {
      width: 100%;
      margin-top: 10px;
    }
  }
</style>
