<template>
  <div>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li :class="{ 'breadcrumb-item': true, 'active': this.$route.name === 'Dashboard' }">
          <a v-if="this.$route.name !== 'Dashboard'" @click="$router.push('/dashboard')" href="">Home</a>
          <p v-else class="mb-0">Home</p>
        </li>
        <li v-if="this.$route.name !== 'Dashboard'" href="#" class="breadcrumb-item active" aria-current="page">Data {{ this.$route.name }}</li>
      </ol>
    </nav>
  </div>
</template>

<script>

export default {
}
</script>

<style scoped>
</style>
