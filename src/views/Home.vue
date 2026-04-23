<template>
  <div class="home">
    <h1>HeartHome</h1>
    <p>欢迎使用 Vue3 + Vuetify + Tailwind CSS</p>
    <input v-model="name" type="text" placeholder="请输入用户名"/>
    <button @click="handleGetUser">获取用户信息</button>
    <p>当前用户：{{ currentUserName }}</p>
    <p>当前用户年龄：{{ age }}</p>
  </div>
</template>

<script setup lang="ts">
import {getUser} from '@/api/user/getUser';
import {ref} from 'vue';

const name = ref<string>('admin');
const currentUserName = ref<string>('');
const age = ref<number | null>(null);

const handleGetUser = () => {
  const targetName = name.value.trim();
  if (!targetName) {
    return;
  }

  getUser(targetName).then((res) => {
    currentUserName.value = res.name;
    age.value = res.age;
  });
};
</script>

<style scoped>
.home {
  padding: 20px;
}
</style>
