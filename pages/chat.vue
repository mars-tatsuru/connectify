<script setup lang="ts">
  const messages = ref<string>();
</script>

<template>
  <div class="main">
    <Splitter class="chat">
      <SplitterPanel :size="30" :minSize="25">
        <div class="chat-history">
          <p class="title">メッセージ履歴</p>
          <div class="overflow">
            <div class="overflow-inner">
              <Panel header="たつ" class="card">
                <p class="message">
                  ここに最新のメッセージが表示されます。文字数は100文字程度にしてみようかな。
                </p>
              </Panel>
              <Panel header="たつ" class="card">
                <p class="message">
                  ここに最新のメッセージが表示されます。文字数は100文字程度にしてみようかな。
                </p>
              </Panel>
              <Panel header="たつ" class="card">
                <p class="message">
                  ここに最新のメッセージが表示されます。文字数は100文字程度にしてみようかな。
                </p>
              </Panel>
              <Panel header="たつ" class="card">
                <p class="message">
                  ここに最新のメッセージが表示されます。文字数は100文字程度にしてみようかな。
                </p>
              </Panel>
              <Panel header="たつ" class="card">
                <p class="message">
                  ここに最新のメッセージが表示されます。文字数は100文字程度にしてみようかな。
                </p>
              </Panel>
              <Panel header="たつ" class="card">
                <p class="message">
                  ここに最新のメッセージが表示されます。文字数は100文字程度にしてみようかな。
                </p>
              </Panel>
              <Panel header="たつ" class="card">
                <p class="message">
                  ここに最新のメッセージが表示されます。文字数は100文字程度にしてみようかな。
                </p>
              </Panel>
              <Panel header="たつ" class="card">
                <p class="message">
                  ここに最新のメッセージが表示されます。文字数は100文字程度にしてみようかな。
                </p>
              </Panel>
              <Panel header="たつ" class="card">
                <p class="message">
                  ここに最新のメッセージが表示されます。文字数は100文字程度にしてみようかな。
                </p>
              </Panel>
            </div>
          </div>
        </div>
      </SplitterPanel>
      <SplitterPanel :size="70">
        <div class="chat-main">
          <p class="title">メッセージ</p>
          <div class="overflow">
            <TheChatCard :sender="true" />
          </div>
          <div class="input-field">
            <Textarea rows="5" cols="30" />
          </div>
        </div>
      </SplitterPanel>
    </Splitter>
  </div>
</template>

<style lang="scss">
  .chat {
    min-height: calc(100vh - 70px);
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
            margin-bottom: 10px;
            border-radius: 5px;
            cursor: pointer;

            &:hover {
              background-color: #f3f3f3;
            }

            .message {
              margin: 0;
              font-size: 12px;
            }
          }
        }
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

      .overflow {
        overflow-y: scroll;
        height: calc(100vh - 315px);

        .card {
          margin-bottom: 10px;
          border-radius: 5px;
          cursor: pointer;

          &:hover {
            background-color: #f3f3f3;
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
        background-color: #f3f3f3;

        textarea {
          width: 100%;
          border: 1px solid #e0e0e0;
          border-radius: 5px;
          padding: 10px;
          resize: none;
        }
      }
    }
  }
</style>
