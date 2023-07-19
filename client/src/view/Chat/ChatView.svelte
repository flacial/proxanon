<script lang="ts">
  import { afterUpdate, beforeUpdate, onDestroy, onMount } from 'svelte'
  import { getSocket } from '../../socket'
  import { getUser } from '../../utils/userdata'
  import { parseUsername } from '../../utils/parse'

  const user = getUser()
  const socket = getSocket(null)

  export let chattingWith: string = ''
  export let chats: { [key: string]: { content: string; owner: string }[] } = {}

  let messageContent: string = ''
  let messagesListElement: HTMLUListElement
  let autoscroll: boolean

  beforeUpdate(() => {
    autoscroll =
      messagesListElement &&
      messagesListElement.offsetHeight + messagesListElement.scrollTop >
        messagesListElement.scrollHeight - 20
  })
  afterUpdate(() => {
    if (autoscroll) {
      scrollToBottomMessageList()
    }
  })

  const scrollToBottomMessageList = () => {
    messagesListElement.scrollTo(0, messagesListElement.scrollHeight)
  }

  const addMessageToChat = ({ owner, to, content }) => {
    chats[to] = chats[to] ?? []
    chats[to].push({
      content,
      owner,
    })
  }

  const sendMessage = (e: KeyboardEvent) => {
    if (e.key !== 'Enter' || !messageContent) return

    socket.emit('chat', {
      to: chattingWith,
      message: messageContent,
      from: user.username,
    })

    addMessageToChat({
      to: chattingWith,
      content: messageContent,
      owner: user.username,
    })

    chats = chats
    messageContent = ''
  }

  const handleChatEvent = (data: { from: string; message: string }) => {
    const { from, message } = data

    addMessageToChat({
      to: chattingWith,
      content: message,
      owner: from,
    })

    chats = chats
  }

  onMount(() => {
    socket.on('chat', handleChatEvent)
    scrollToBottomMessageList()
  })
  onDestroy(() => socket.off('chat', handleChatEvent))
</script>

<div class="flex flex-col h-full">
  <div class="w-full p-3 bg-secondaryGray border-b-2 border-b-darkGray">
    <span class="font-display text-2xl text-gray">
      {chattingWith}
    </span>
  </div>
  <ul
    class="grid gap-2 overflow-auto max-h-[100dvh] py-3"
    bind:this={messagesListElement}
  >
    {#each chats[chattingWith] || [] as message}
      <li>
        {#if message.owner === user.username}
          <li class="bg-[#3D271F] px-3 py-1">
            <span class="font-display text-darkGray text-sm"
              >{parseUsername(user.username)}</span
            >
            <p>{message.content}</p>
          </li>
        {:else}
          <li class="bg-secondaryGray px-3 py-1">
            <span>{parseUsername(chattingWith)}</span>
            <p>{message.content}</p>
          </li>
        {/if}
      </li>
    {/each}
  </ul>
  <div class="mt-auto">
    <input
      class="w-full p-3 bg-secondaryGray outline-none placeholder:text-sm placeholder:text-ellipsis placeholder:h-full"
      placeholder="Write a message..."
      bind:value={messageContent}
      on:keydown={sendMessage}
    />
  </div>
</div>
