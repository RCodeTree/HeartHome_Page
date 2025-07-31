/* 
使用当前指令的组件或文件：
  My.vue (src/Pages/Side/My.vue)

*/
// 懒加载指令
export const vLazy = {
    mounted(el, binding) {
        function loadImage() {
            if (binding.value && binding.value !== 'null' && binding.value !== 'undefined') {
                el.src = binding.value
            }
        }

        function handleIntersect(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    loadImage()
                    observer.unobserve(el)
                }
            })
        }

        function createObserver() {
            const options = {
                root: null,
                threshold: 0.1
            }
            const observer = new IntersectionObserver(handleIntersect, options)
            observer.observe(el)
        }

        if (window.IntersectionObserver) {
            createObserver()
        } else {
            loadImage()
        }
    },
    updated(el, binding) {
        if (binding.value && binding.value !== 'null' && binding.value !== 'undefined') {
            el.src = binding.value
        }
    }
}

export default vLazy