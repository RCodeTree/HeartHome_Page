<template>
  <div class="chat-container d-flex flex-column vh-100">
    <!-- 聊天窗口头部 -->
    <header class="chat-header d-flex align-items-center p-3">
      <button class="btn btn-link text-dark me-3" @click="goBack">
        <i class="bi bi-arrow-left fs-4"></i>
      </button>
      <div class="user-info d-flex align-items-center">
        <img src="/image/OIP-C (3).jpg" class="avatar rounded-circle me-3" alt="Contact">
        <div>
          <h6 class="mb-0 fw-bold">Eniola Osabiya</h6>
          <small class="text-muted">在线</small>
        </div>
      </div>
    </header>

    <!-- 聊天窗口主体 -->
    <main class="message-area flex-grow-1 p-3" ref="messageArea">
      <template v-for="(message, index) in messages" :key="index">
        <div class="time-divider">
          <span>{{ formatTimeDivider(message.timestamp) }}</span>
        </div>
        <div class="message-group mb-3" :class="message.type">
          <!-- 接收的消息 -->
          <template v-if="message.type === 'incoming'">
            <img :src="message.avatar" class="avatar rounded-circle me-2" :alt="message.sender">
            <div class="message-bubble p-3">
              <p class="mb-0" v-html="formatMessageContent(message.content)"></p>
            </div>
          </template>

          <!-- 发送的消息 -->
          <template v-else>
            <div class="message-bubble p-3">
              <p class="mb-0" v-html="formatMessageContent(message.content)"></p>
            </div>
            <img :src="message.avatar" class="avatar rounded-circle ms-2" :alt="message.sender">
          </template>
        </div>
      </template>
    </main>

    <!-- 聊天窗口底部 -->
    <footer class="chat-footer p-3">
      <div class="input-group">
        <button class="btn btn-link"><i class="bi bi-emoji-smile fs-4"></i></button>
        <button class="btn btn-link"><i class="bi bi-paperclip fs-4"></i></button>
        <textarea class="form-control message-input" placeholder="输入消息..." v-model="newMessage" @keydown="handleKeyDown"
          @input="handleInput" rows="1" style="resize: none; overflow: hidden;"></textarea>
        <button class="btn send-btn" @click="sendMessage" :disabled="!newMessage.trim()" ref="sendBtn">
          <i :class="sendIconClass" class="fs-4"></i>
        </button>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const messageArea = ref(null)
const newMessage = ref('')
const sendBtn = ref(null)

// 消息数据
const messages = ref([
  {
    type: 'incoming',
    content: 'https://lantian.pub/',
    sender: 'Eniola Osabiya',
    timestamp: new Date(new Date().setDate(new Date().getDate() - 2)),
    avatar: '/image/OIP-C (3).jpg'
  },
  {
    type: 'outgoing',
    content: '1348780991@qq.com\nzxcvb12345',
    sender: '我',
    timestamp: new Date(new Date().setDate(new Date().getDate() - 1)),
    avatar: '/image/OIP-C (4).jpg'
  },
  {
    type: 'incoming',
    content: 'https://www.v2ex.com/t/1146204#reply9',
    sender: 'Eniola Osabiya',
    timestamp: new Date(),
    avatar: '/image/OIP-C (3).jpg'
  },
  {
    type: 'incoming',
    content: 'https://www.awwwards.com/',
    sender: 'Eniola Osabiya',
    timestamp: new Date(new Date().getTime() + 60000), // 1 minute later
    avatar: '/image/OIP-C (3).jpg'
  },
  {
    type: 'incoming',
    content: 'https://wizardforcel.gitbooks.io/lcthw/content/',
    sender: 'Eniola Osabiya',
    timestamp: new Date(new Date().getTime() + 120000), // 2 minutes later
    avatar: '/image/OIP-C (3).jpg'
  }
])

// 返回上一页
const goBack = () => {
  router.back()
}

// 格式化消息内容
const formatMessageContent = (content) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
  let formattedContent = content.replace(/\n/g, '<br>');
  formattedContent = formattedContent.replace(urlRegex, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
  formattedContent = formattedContent.replace(emailRegex, '<a href="mailto:$1">$1</a>');
  return formattedContent;
}


// 显示时间分隔符
// const shouldShowTimeDivider = (message, index) => {
//   // 每条消息都显示时间，特别是用户发送的消息
//   if (message.type === 'outgoing') {
//     return true;
//   }
//   // 对于接收的消息，保持原有逻辑
//   if (index === 0) return true;
//   const prevMessage = messages.value[index - 1];
//   const diff = message.timestamp.getTime() - prevMessage.timestamp.getTime();
//   // Show time if more than 5 minutes passed or if the day is different
//   const prevDate = new Date(prevMessage.timestamp);
//   const currDate = new Date(message.timestamp);
//   if (prevDate.toDateString() !== currDate.toDateString()) {
//     return true;
//   }
//   return diff > 5 * 60 * 1000;
// }


// 格式化时间分隔符
const formatTimeDivider = (timestamp) => {
  const date = new Date(timestamp);
  const days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

  const today = new Date();
  today.setHours(0, 0, 0, 0); // 今天0点
  const yesterday = new Date(today); // 昨天0点

  yesterday.setDate(yesterday.getDate() - 1);

  const messageDate = new Date(date);
  messageDate.setHours(0, 0, 0, 0);

  const time = date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', hour12: false });

  if (messageDate.getTime() === today.getTime()) {
    return time;
  }
  if (messageDate.getTime() === yesterday.getTime()) {
    return `昨天 ${time}`;
  }

  const dayOfWeek = days[date.getDay()];
  return `${dayOfWeek} ${time}`;
}

// 处理键盘事件
const handleKeyDown = (event) => {
  if (event.key === 'Enter') {
    if (event.ctrlKey) {
      // Ctrl+Enter 换行，但限制最多3行
      const currentLines = newMessage.value.split('\n').length
      if (currentLines >= 3) {
        event.preventDefault()
        return
      }

      const textarea = event.target
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const newValue = newMessage.value.substring(0, start) + '\n' + newMessage.value.substring(end)

      // 再次检查行数限制
      const newLines = newValue.split('\n').length
      if (newLines > 3) {
        event.preventDefault()
        return
      }

      newMessage.value = newValue
      nextTick(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 1
        autoResizeTextarea(textarea)
      })
      event.preventDefault()
    } else {
      // Enter 发送消息
      event.preventDefault()
      sendMessage()
    }
  }
}

// 处理输入事件
const handleInput = (event) => {
  // 检查行数限制
  const lines = newMessage.value.split('\n')
  if (lines.length > 3) {
    // 如果超过3行，截取前3行
    const truncatedValue = lines.slice(0, 3).join('\n')
    newMessage.value = truncatedValue
    nextTick(() => {
      // 将光标移到末尾
      const textarea = event.target
      textarea.value = truncatedValue
      textarea.selectionStart = textarea.selectionEnd = truncatedValue.length
    })
  }
  autoResizeTextarea(event.target)
}

// 自动调整textarea高度
const autoResizeTextarea = (textarea) => {
  textarea.style.height = 'auto'
  // 限制最大高度为3行的高度（约72px）
  const maxHeight = 72
  const newHeight = Math.min(textarea.scrollHeight, maxHeight)
  textarea.style.height = newHeight + 'px'
}

// 计算发送图标类名 - 保持固定图标，不随换行变化
const sendIconClass = computed(() => {
  return 'bi bi-send-fill'
})

// 发送消息
const sendMessage = () => {
  if (!newMessage.value.trim()) return

  messages.value.push({
    type: 'outgoing',
    content: newMessage.value,
    sender: '我',
    timestamp: new Date(),
    avatar: '/image/OIP-C (4).jpg'
  })

  newMessage.value = ''

  // 重置textarea高度
  nextTick(() => {
    const textarea = document.querySelector('.message-input')
    if (textarea) {
      textarea.style.height = 'auto'
    }
    scrollToBottom()
  })
}

// 滚动到底部
const scrollToBottom = () => {
  if (messageArea.value) {
    messageArea.value.scrollTop = messageArea.value.scrollHeight
  }
}

// 组件挂载后滚动到底部
onMounted(() => {
  scrollToBottom()
})
</script>

<style scoped>
.chat-container {
  background-color: #ffffff;
  color: #333;
}

.chat-header {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.chat-header .btn-link {
  color: #333 !important;
  text-decoration: none;
}

.chat-header .btn-link:hover {
  color: rgba(0, 0, 0, 0.8) !important;
}

.avatar {
  width: 40px;
  height: 40px;
  object-fit: cover;
}

.message-area {
  overflow-y: auto;
  background: transparent;
}

.message-area::-webkit-scrollbar {
  width: 6px;
}

.message-area::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 3px;
}

.message-area::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 3px;
}

.message-area::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.5);
}

.message-group {
  display: flex;
  align-items: flex-end;
}

.message-group.incoming {
  justify-content: flex-start;
}

.message-group.outgoing {
  justify-content: flex-end;
}

.message-bubble {
  max-width: 70%;
  border-radius: 18px;
  position: relative;
}

.incoming .message-bubble {
  background: rgba(240, 240, 240, 0.9);
  color: #333;
  margin-left: 8px;
}

.outgoing .message-bubble {
  background: rgba(102, 126, 234, 0.8);
  color: white;
  margin-right: 8px;
}

.message-meta {
  font-size: 0.75rem;
  margin-top: 4px;
}

.chat-footer {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.chat-footer .input-group {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 30px;
  padding: 6px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: flex-end;
}

.chat-footer .btn-link {
  color: #333 !important;
  text-decoration: none;
  padding: 6px;
  border-radius: 50%;
  border: none;
  background: transparent;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chat-footer .btn-link i {
  line-height: 1;
  vertical-align: middle;
}

.chat-footer .btn-link:hover {
  background: rgba(0, 0, 0, 0.1);
}

.message-input {
  background: transparent;
  border: none;
  color: #333;
  border-radius: 20px;
  padding: 12px 16px;
  flex: 1;
  /* 隐藏滚动条 */
  scrollbar-width: none;
  /* Firefox */
  -ms-overflow-style: none;
  /* IE and Edge */
}

.message-input::-webkit-scrollbar {
  display: none;
  /* Chrome, Safari, Opera */
}

.message-input::placeholder {
  color: rgba(0, 0, 0, 0.6);
}

.message-input:focus {
  background: transparent;
  border: none;
  box-shadow: none;
  outline: none;
  color: #333;
}

.send-btn {
  background: rgba(102, 126, 234, 0.8);
  border: 1px solid rgba(102, 126, 234, 0.8);
  color: white;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 4px;
  margin-right: 2px;
  flex-shrink: 0;
  transition: background-color 0.2s ease;
  align-self: flex-end;
  position: relative;
}

.send-btn i {
  line-height: 1;
  vertical-align: middle;
}

.send-btn:hover:not(:disabled) {
  background: rgba(102, 126, 234, 1);
  border-color: rgba(102, 126, 234, 1);
  color: white;
}

.send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.time-divider {
  text-align: center;
  margin: 1rem 0;
}

.time-divider span {
  background-color: #e9ecef;
  color: #6c757d;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .message-bubble {
    max-width: 85%;
  }

  .avatar {
    width: 32px;
    height: 32px;
  }

  .chat-header h6 {
    font-size: 0.9rem;
  }

  .message-area {
    padding: 1rem;
  }
}
</style>