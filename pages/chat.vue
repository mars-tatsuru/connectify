<script setup lang="ts">
  const chatHistoryData = ref<ChatData[]>();
  const supabase = useSupabaseClient();
  const store = useMainStore();

  type ChatData = {
    id?: number;
    created_at?: string;
    user_name: string;
    message: string;
  };

  const inputVal = ref<string>("");

  // Fetch chat data
  const fetchChatData = async () => {
    // Fetch from supabase
    const { data, error } = await supabase.from("chat").select("*");
    if (error) {
      console.error("Error fetching chat data:", error.message);
    } else {
      const userChatHistory = data.filter((item: any) => {
        return (
          item.user_name === store.userName || item.user_name === "Guest User"
        );
      });

      // Get only the latest history
      const latestChatHistory = userChatHistory.reduce((acc: any, cur: any) => {
        const found = acc.find((item: any) => item.user_name === cur.user_name);
        if (found) {
          if (new Date(found.created_at) < new Date(cur.created_at)) {
            return acc.map((item: any) =>
              item.user_name === cur.user_name ? cur : item
            );
          } else {
            return acc;
          }
        } else {
          return [...acc, cur];
        }
      }, []);

      // Set the latest chat history
      chatHistoryData.value = latestChatHistory as ChatData[];
    }
  };

  // Click chat submit button
  const clickChatSubmitBtn = async () => {
    const user_name = store.userName || "Guest User";
    const message = inputVal.value;
    await insertChatData(user_name, message);
    inputVal.value = "";
  };

  // Insert chat data
  const insertChatData = async (user_name: string, message: string) => {
    const chatData: ChatData = {
      user_name,
      message,
    };

    const { data, error } = await supabase
      .from("chat")
      .insert([chatData] as any)
      .select();

    if (error) {
      console.error("Error inserting chat data:", error.message);
    } else {
      await fetchChatData();
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
            // データ登録
            if (payload.eventType === "INSERT") {
              const { created_at, id, message, user_name } = payload.new;
              chatHistoryData.value = [
                ...(chatHistoryData.value ?? []),
                {
                  id,
                  created_at,
                  user_name,
                  message,
                },
              ];
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

  // onMounted
  onMounted(async () => {
    await fetchChatData();
  });
</script>

<template>
  <div class="main">
    <Splitter class="chat">
      <SplitterPanel :size="25" :minSize="20">
        <div class="chat-history">
          <p class="title">メッセージ履歴</p>
          <div v-if="chatHistoryData?.length" class="overflow">
            <div class="overflow-inner">
              <Panel
                v-for="{ id, user_name, message } in chatHistoryData"
                :key="id"
                :header="user_name"
                class="card"
              >
                <p class="message">
                  {{ message }}
                </p>
              </Panel>
            </div>
          </div>
          <p v-else class="no-history">チャット履歴はありません。</p>
        </div>
      </SplitterPanel>
      <SplitterPanel :size="75">
        <div class="chat-main">
          <p class="title">メッセージ</p>
          <p class="no-selected">トークルームがまだ選択されていません。</p>
          <div class="overflow">
            <div
              v-for="{ id, user_name, message } in chatHistoryData"
              class="chat-card"
            ></div>
          </div>
          <div class="input-field">
            <div class="input-field__inner">
              <Textarea v-model="inputVal" rows="1" cols="30" />
              <Button label="" icon="pi pi-send" @click="clickChatSubmitBtn" />
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

      .title {
        font-size: 16px;
        font-weight: 600;
        margin: 0 0 20px 0;
        color: $primary;
      }

      .overflow {
        overflow-y: scroll;

        &-inner {
          height: calc(100vh - 160px);
          padding: 0px 10px 10px 0px;

          .card {
            width: 100%;
            margin-bottom: 10px;
            border-radius: 5px;
            cursor: pointer;

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
        height: calc(100vh - 315px);

        .card {
          margin-bottom: 10px;
          border-radius: 5px;
          cursor: pointer;

          &:hover {
            background-color: $buttonFocusColor;
          }

          .message {
            margin: 0;
            font-size: 12px;
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
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;

          textarea {
            width: 95%;
            border: 1px solid $borderColor;
            border-radius: 5px;
            padding: 10px;
            resize: none;
          }
        }
      }
    }
  }
</style>
