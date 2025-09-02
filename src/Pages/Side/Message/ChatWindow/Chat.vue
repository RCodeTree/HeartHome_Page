<template>
  <div class="chat-container d-flex flex-column vh-100">
    <!-- 聊天窗口头部 -->
    <header class="chat-header d-flex align-items-center p-3">
      <button class="btn btn-link text-dark me-3" @click="goBack">
        <ArrowLeftIcon class="w-6 h-6" />
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

      <!-- 文件上传进度提示 -->
      <div v-if="uploadingFiles.length > 0" class="uploading-indicator p-2">
        <div v-for="fileName in uploadingFiles" :key="fileName" class="d-flex align-items-center mb-1">
          <div class="spinner-border spinner-border-sm me-2" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <small class="text-muted">正在上传: {{ fileName }}</small>
        </div>
      </div>
    </main>

    <!-- 聊天窗口底部 -->
    <footer class="chat-footer p-3">
      <div class="input-group">
        <button class="btn btn-link" @click="toggleEmojiPanel" data-emoji-trigger><FaceSmileIcon class="w-6 h-6" /></button>
        <button class="btn btn-link" @click="triggerFileUpload"><PaperClipIcon class="w-6 h-6" /></button>
        <input type="file" ref="fileInput" @change="handleFileSelect" style="display: none;" multiple
          accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt">
        <textarea class="form-control message-input" placeholder="输入消息..." v-model="newMessage" @keydown="handleKeyDown"
          @input="handleInput" rows="1" style="resize: none; overflow: hidden;"></textarea>
        <button class="btn send-btn" @click="sendMessage" :disabled="!newMessage.trim()" ref="sendBtn">
          <PaperAirplaneIcon :class="sendIconClass" />
        </button>
      </div>

      <!-- 表情包面板 -->
      <div v-if="showEmojiPanel"
        class="emoji-panel position-absolute bottom-100 start-0 bg-white border rounded-3 shadow-lg p-3 mb-2"
        style="width: 300px; max-height: 200px; overflow-y: auto; z-index: 1000;">
        <div class="emoji-grid">
          <button v-for="emoji in emojiList" :key="emoji" class="emoji-btn btn btn-light border-0 p-2 m-1 rounded-2"
            @click="insertEmoji(emoji)" style="font-size: 1.2rem; width: 40px; height: 40px;">
            {{ emoji }}
          </button>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeftIcon, FaceSmileIcon, PaperClipIcon, PaperAirplaneIcon, DocumentIcon } from '@heroicons/vue/24/solid'

const router = useRouter()
const messageArea = ref(null)
const newMessage = ref('')
const sendBtn = ref(null)
const fileInput = ref(null)
const uploadingFiles = ref([])
const showEmojiPanel = ref(false)

// 表情包列表
const emojiList = ref([
  '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇',
  '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚',
  '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩',
  '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣',
  '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬',
  '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗',
  '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😬', '🙄', '😯',
  '😦', '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐',
  '🥴', '🤢', '🤮', '🤧', '😷', '🤒', '🤕', '🤑', '🤠', '😈',
  '👿', '👹', '👺', '🤡', '💩', '👻', '💀', '☠️', '👽', '👾'
])

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
  return 'w-6 h-6'
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

// 触发文件上传
const triggerFileUpload = () => {
  fileInput.value?.click()
}

// 处理文件选择
const handleFileSelect = async (event) => {
  const files = Array.from(event.target.files)
  if (files.length === 0) return

  for (const file of files) {
    await uploadFile(file)
  }

  // 清空文件输入
  event.target.value = ''
}

// 上传文件
const uploadFile = async (file) => {
  try {
    // 添加到上传中列表
    uploadingFiles.value.push(file.name)

    // 创建FormData
    const formData = new FormData()
    formData.append('file', file)

    // 这里应该调用实际的文件上传API
    // const response = await axios.post('/api/upload', formData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data'
    //   }
    // })

    // 模拟上传过程
    await new Promise(resolve => setTimeout(resolve, 1000))

    // 模拟上传成功，创建文件URL（实际应用中应该使用服务器返回的URL）
    const fileUrl = URL.createObjectURL(file)

    // 发送文件消息
    sendFileMessage(file, fileUrl)

    // 从上传中列表移除
    uploadingFiles.value = uploadingFiles.value.filter(name => name !== file.name)

  } catch (error) {
    console.error('文件上传失败:', error)
    // 从上传中列表移除
    uploadingFiles.value = uploadingFiles.value.filter(name => name !== file.name)
    // 这里可以添加错误提示
  }
}

// 发送文件消息
const sendFileMessage = (file, fileUrl) => {
  let content = ''

  if (file.type.startsWith('image/')) {
    content = `<img src="${fileUrl}" alt="${file.name}" style="max-width: 200px; max-height: 200px; border-radius: 8px;" />`
  } else if (file.type.startsWith('video/')) {
    content = `<video controls style="max-width: 200px; max-height: 200px; border-radius: 8px;"><source src="${fileUrl}" type="${file.type}">您的浏览器不支持视频播放。</video>`
  } else if (file.type.startsWith('audio/')) {
    content = `<audio controls><source src="${fileUrl}" type="${file.type}">您的浏览器不支持音频播放。</audio>`
  } else {
    content = `<a href="${fileUrl}" download="${file.name}" style="color: #007bff; text-decoration: none; display: flex; align-items: center;"><svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-3.75a3.75 3.75 0 01-3.75-3.75V1.5H5.625z" /><path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" /></svg> ${file.name}</a>`
  }

  messages.value.push({
    type: 'outgoing',
    content: content,
    sender: '我',
    timestamp: new Date(),
    avatar: '/image/OIP-C (4).jpg'
  })

  nextTick(() => {
    scrollToBottom()
  })
}

// 切换表情包面板
const toggleEmojiPanel = () => {
  showEmojiPanel.value = !showEmojiPanel.value
}

// 插入表情
const insertEmoji = (emoji) => {
  const textarea = document.querySelector('.message-input')
  if (textarea) {
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const newValue = newMessage.value.substring(0, start) + emoji + newMessage.value.substring(end)

    newMessage.value = newValue

    nextTick(() => {
      textarea.focus()
      textarea.selectionStart = textarea.selectionEnd = start + emoji.length
      autoResizeTextarea(textarea)
    })
  } else {
    newMessage.value += emoji
  }

  // 插入表情后关闭面板
  showEmojiPanel.value = false
}

// 点击外部关闭表情包面板
const handleClickOutside = (event) => {
  const emojiPanel = document.querySelector('.emoji-panel')
  const emojiBtn = event.target.closest('.btn[data-emoji-trigger]')

  if (showEmojiPanel.value && emojiPanel && !emojiPanel.contains(event.target) && !emojiBtn) {
    showEmojiPanel.value = false
  }
}

// 组件挂载后滚动到底部
onMounted(() => {
  scrollToBottom()
  // 添加全局点击事件监听
  document.addEventListener('click', handleClickOutside)
})

// 组件卸载时移除事件监听
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
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
  /* 隐藏滚动条 */
}

.message-area {
  scrollbar-width: none;
  /* Firefox */
  -ms-overflow-style: none;
  /* IE and Edge */
}

.message-area::-webkit-scrollbar {
  display: none;
  /* Chrome, Safari, Opera */
}

/* 文件上传进度提示样式 */
.uploading-indicator {
  background-color: #f8f9fa;
  border-top: 1px solid #dee2e6;
  border-bottom: 1px solid #dee2e6;
}

.uploading-indicator .spinner-border-sm {
  width: 1rem;
  height: 1rem;
  color: #007bff;
}

/* 表情包面板样式 */
.emoji-panel {
  animation: fadeInUp 0.2s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.emoji-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
}

.emoji-btn {
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.emoji-btn:hover {
  background-color: #e9ecef !important;
  transform: scale(1.1);
}

.emoji-btn:active {
  transform: scale(0.95);
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
  word-wrap: break-word;
  word-break: break-word;
  overflow-wrap: break-word;
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

.message-bubble p {
  word-wrap: break-word;
  word-break: break-word;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  margin-bottom: 0 !important;
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
  background: transparent;
  border: none;
  color: rgba(102, 126, 234, 0.8);
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 4px;
  margin-right: 2px;
  flex-shrink: 0;
  transition: all 0.2s ease;
  align-self: flex-end;
  position: relative;
}

.send-btn i {
  line-height: 1;
  vertical-align: middle;
}

.send-btn:hover:not(:disabled) {
  background: rgba(102, 126, 234, 0.1);
  color: rgba(102, 126, 234, 1);
  transform: scale(1.1);
}

.send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  color: rgba(102, 126, 234, 0.3);
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

@media (max-width: 576px) {
  .message-bubble {
    max-width: 90%;
  }

  .avatar {
    width: 28px;
    height: 28px;
  }

  .chat-header {
    padding: 0.75rem;
  }

  .chat-footer {
    padding: 0.75rem;
  }

  .message-area {
    padding: 0.75rem;
  }
}

@media (max-width: 480px) {
  .message-bubble {
    max-width: 95%;
  }

  .incoming .message-bubble {
    margin-left: 4px;
  }

  .outgoing .message-bubble {
    margin-right: 4px;
  }
}
</style>