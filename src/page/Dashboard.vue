<template>
  <div>
    <NavbarDashboard />
    <b-container class="py-5">
      <b-row>
        <b-col cols="12">
          <h1>Dashboard Petugas</h1>
          <Breadcrumb />
        </b-col>

        <b-col cols="12" lg="4" class="d-flex justify-content-center">
          <b-card
            title="Data Posko"
            :img-src="require('@/assets/posko.png')"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
            @click="goToPage('posko')"
          >
            <b-button variant="primary">Halaman Posko</b-button>
          </b-card>
        </b-col>

        <b-col cols="12" lg="4" class="d-flex justify-content-center">
          <b-card
            title="Data Korban"
            :img-src="require('@/assets/korban.png')"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
            @click="goToPage('korban')"
          >
            <b-button variant="primary">Halaman Korban</b-button>
          </b-card>
        </b-col>

        <b-col cols="12" lg="4" class="d-flex justify-content-center">
          <b-card
            title="Data Offline"
            :img-src="require('@/assets/offline.png')"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
            @click="goToPage('offline')"
          >
            <b-button variant="primary">Halaman Offline</b-button>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import NavbarDashboard from '@/components/NavbarDashboard.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'
import { BContainer } from 'bootstrap-vue'

export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
    }
  },
  name: 'Dashboard',
  components: {
    NavbarDashboard,
    Breadcrumb,
    BContainer,
  },
  mounted() {
    localStorage.getItem('loggedIn') !== 'true' ? this.$router.push("/") : ''
  },
  methods: {
    usernameEnter() {
      this.$refs.password.focus()
    },
    goToPage(value) {
      this.$router.push("/"+value)
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card:hover{
  cursor: pointer;
}
</style>
