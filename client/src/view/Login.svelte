<script lang="ts">
  import '../app.css'
  import Binoculars from '../lib/assets/icons/binoculars.svg'
</script>

<main class="main flex flex-col items-center">
  <span class="text-gray font-display text-6xl">Proxanon</span>
  <div class="mb-8">
    <span>Chat anonymously in</span>
    <img class="inline" src={Binoculars} alt="binoculars icon" />
    <span>proximity</span>
  </div>
  <button
    class="button orange-gradient px-12 py-3 font-medium transition-shadow hover:shadow-2xl hover:shadow-orange-600/50 focus:outline-none focus:ring focus:ring-orange-300 active:opacity-90"
  >
    <span class="drop-shadow">Sign in Anonymously</span>
  </button>
</main>

<style>
  .main {
    padding-top: 30vh;
  }
</style>
