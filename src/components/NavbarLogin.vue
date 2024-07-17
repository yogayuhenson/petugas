<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="primary">
      <b-navbar-brand>
        <img
          @click="goToHome()"
          :src="require('@/assets/navbar.png')"
          style="height: 5vw"
        />
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <button
            class="btn btn-sm btn-warning disabled"
          >
            Dashboard Petugas Posko
          </button>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { BNavbar } from "bootstrap-vue"

export default {
  name: "NavbarLogin",
  components: {
    BNavbar,
  },
  methods: {
    goToHome() {
      this.$router.push("/")
    },
    goToTentang() {
      this.$router.push("/about")
    }
  }
};
</script>

<style scoped>
nav {
  border-top-left-radius: 2vw;
  border-top-right-radius: 2vw;
}
.navbar-brand img:hover {
  cursor: pointer;
}
</style>
