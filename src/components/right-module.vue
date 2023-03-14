<template>
  <div class="right-module">
    <div class="logout d-flex a-i-c r">
      <svg
        t="1677849710627"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2763"
        width="20"
        height="20"
      >
        <path
          d="M768.8 702.2c-8 0-16-3.2-22.4-9.6-12.8-12.8-12.8-32 0-44.7l137.4-137.4-137.3-137.4c-12.8-12.8-12.8-32 0-44.7s32-12.8 44.7 0L951 488.1c12.8 12.8 12.8 32 0 44.7L791.2 692.6c-6.4 6.4-14.4 9.6-22.4 9.6zM321.5 510.5c0-17.6 14.4-32 32-32h559.2c17.6 0 32 14.4 32 32s-14.4 32-32 32H353.5c-17.6-0.1-32-14.4-32-32zM65.9 830V191c0-52.7 43.1-95.9 95.9-95.9h351.5c52.7 0 95.9 43.1 95.9 95.9v127.8c0 17.6-14.4 32-32 32s-32-14.4-32-32V191c0-17.6-14.4-32-32-32H161.7c-17.6 0-32 14.4-32 32v639c0 17.6 14.4 32 32 32h351.5c17.6 0 32-14.4 32-32V702.2c0-17.6 14.4-32 32-32s32 14.4 32 32V830c0 52.7-43.1 95.9-95.9 95.9H161.7c-52.7 0-95.8-43.1-95.8-95.9z"
          fill="#3E75FF"
          p-id="2764"
        ></path>
      </svg>
      <span class="f12 ml5 b" style="color: #3e75ff">Logout</span>
    </div>
    <div class="fix"></div>
    <div class="mt10">
      <div class="d-flex j-c-c">
        <img
          v-img-lazy
          style="width: 100px; height: 100px"
          class="round"
          src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
          alt=""
        />
      </div>
      <p class="tc b f14 mt10 ellipsi">用户名</p>
      <p class="tc f12 mt5 theme ellipsi">简介</p>
    </div>

    <div class="message mt20">
      <div class="d-flex j-c-sb a-i-c">
        <h2 class="f14">消息</h2>
        <i class="el-icon-chat-dot-square f20 theme poi"></i>
      </div>
      <div class="message-box scrollbar">
        <div class="mt10 poi" v-for="i in 2" :key="i">
          <div class="d-flex a-i-c">
            <img
              v-img-lazy
              style="width: 36px; height: 36px"
              class="round"
              src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
              alt=""
            />
            <div class="ml5">
              <p class="f12 b">消息标题</p>
              <p class="f10 mt5 theme ellipsi">消息内容23424234234234223434</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="activity">
      <div class="d-flex j-c-sb a-i-c">
        <h2 class="f14">活动</h2>
        <i class="el-icon-bell f20 theme poi"></i>
      </div>
      <div class="activity-box scrollbar">
        <div class="mt10 poi" v-for="i in 10" :key="i">
          <div class="d-flex a-i-c">
            <img
              v-img-lazy
              style="width: 36px; height: 36px"
              class="round"
              src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
              alt=""
            />
            <div class="ml5">
              <p class="f12 b">活动标题</p>
              <p class="f10 mt5 theme ellipsi">消息内容23424234234234223434</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "right-module",

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="less" scoped>
.message {
  margin-top: 20px;
  position: relative;
}

.activity {
  margin-top: 20px;
  position: relative;

  &::after {
    content: "";
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 150px;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 1) 100%
    );
    pointer-events: none;
  }
}

.message-box,
.activity-box {
  height: 260px;
  overflow-y: scroll;
  overflow-x: hidden;
}

.message-box {
  height: 100px;
}

.logout {
  height: 50px;
}
</style>
