<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <b-navbar-brand @click="goToPage('dashboard')">
        <i class="fa fa-home" aria-hidden="true"></i>
        Dashboard Petugas
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item
            @click="goToPage('posko')"
            :active="this.$route.name === 'Posko'"
          >
            Data Posko
          </b-nav-item>
          <b-nav-item
            @click="goToPage('korban')"
            :active="this.$route.name === 'Korban'"
          >
            Data Korban
          </b-nav-item>
          <b-nav-item
            @click="goToPage('offline')"
            :active="this.$route.name === 'Offline'"
          >
            Data Offline
          </b-nav-item>
          <b-nav-item class="network-status" disabled>
            <b-badge :variant="networkStatus ? 'success' : 'danger'">
              Status Jaringan:
              <b>
                {{ networkStatus ? 'Online' : 'Offline' }}
              </b>
            </b-badge>
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>{{ username }}</em>
            </template>
            <b-dropdown-item @click="logout()">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { BNavbar } from 'bootstrap-vue'

export default {
  name: 'NavbarDashboard',
  components: {
    BNavbar,
  },
  data() {
    return {
      username: '',
      networkStatus: true
    }
  },
  mounted() {
    this.checkNetworkStatus
    this.username = localStorage.getItem('username')

    setInterval(this.checkNetworkStatus, 1000);
  },
  methods: {
    goToPage(value) {
      this.$router.push('/' + value)
    },
    logout() {
      localStorage.removeItem('loggedIn')
      this.$router.push('/')
    },
    checkNetworkStatus() {
      this.networkStatus = navigator.onLine;
    }
  },
}
</script>

<style scoped>
.navbar-brand:hover {
  cursor: pointer;
}

.network-status {
  pointer-events: none;
}
</style>
