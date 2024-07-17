<template>
  <div>
    <NavbarDashboard />
    <b-container class="py-5">
      <b-row>
        <b-col cols="12">
          <h1>Data Offline</h1>
          <Breadcrumb />
        </b-col>

        <b-col cols="12">
          <b-card no-body class="home-card">
            <b-tabs card>
              <b-tab title="Data Posko" active>
                <b-row>
                  <b-col cols="12">
                    <b-table
                      :items="itemsPosko"
                      :fields="fieldsPosko"
                      striped
                      responsive
                    >
                      <template #cell(type)="row">
                        <span>
                          {{ row.item.type === 'put' ? 'Ubah' : 'Tambah' }}
                        </span>
                      </template>
                      <template #cell(alamat_posko)="row">
                        <span>
                          {{ truncateText(row.item.alamat_posko, 60) }}
                        </span>
                      </template>
                      <template #cell(gmaps_posko)="row">
                        <span>
                          {{ truncateText(row.item.gmaps_posko, 30) }}
                        </span>
                      </template>
                      <template #cell(action)="row">
                        <b-button
                          size="sm"
                          v-b-modal.modal-edit
                          variant="success"
                          class="mb-2"
                          @click="kirimFormPosko(row.item)"
                        >
                          <i class="fa fa-check" aria-hidden="true"></i>
                          Kirim
                        </b-button>

                        <br />

                        <b-button
                          size="sm"
                          @click="submitFormDelete(row.item)"
                          variant="danger"
                        >
                          <i class="fa fa-trash" aria-hidden="true"></i>
                          Hapus
                        </b-button>
                      </template>
                    </b-table>
                  </b-col>
                </b-row>
              </b-tab>

              <b-tab title="Data Korban">
                <b-row>
                  <b-col cols="12">
                    <b-table
                      :items="itemsKorban"
                      :fields="fieldsKorban"
                      striped
                      responsive
                    >
                      <template #cell(type)="row">
                        <span>
                          {{ row.item.type === 'put' ? 'Ubah' : 'Tambah' }}
                        </span>
                      </template>
                      <template #cell(action)="row">
                        <b-button
                          size="sm"
                          v-b-modal.modal-edit
                          variant="success"
                          class="mb-2"
                          @click="kirimFormKorban(row.item)"
                        >
                          <i class="fa fa-check" aria-hidden="true"></i>
                          Kirim
                        </b-button>

                        <br />
                        
                        <b-button
                          size="sm"
                          @click="submitFormDelete(row.item)"
                          variant="danger"
                        >
                          <i class="fa fa-trash" aria-hidden="true"></i>
                          Hapus
                        </b-button>
                      </template>
                    </b-table>
                  </b-col>
                </b-row>
              </b-tab>
            </b-tabs>
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
import axios from 'axios'

export default {
  data() {
    return {
      fieldsPosko: [
        { key: 'type', label: 'Tipe Data' },
        { key: 'nama_posko', label: 'Nama Posko' },
        { key: 'nama_pj_posko', label: 'Penanggung Jawab' },
        { key: 'hp_pj_posko', label: 'Kontak' },
        { key: 'alamat_posko', label: 'Alamat' },
        { key: 'gmaps_posko', label: 'Gmaps' },
        { key: 'action', label: 'Action' },
      ],
      itemsPosko: [],
      fieldsKorban: [
        { key: 'type', label: 'Tipe Data' },
        { key: 'nama', label: 'Nama' },
        { key: 'usia', label: 'Usia' },
        { key: 'jenis_kelamin', label: 'Jenis Kelamin' },
        { key: 'nik', label: 'NIK' },
        { key: 'ciri_ciri', label: 'Ciri-ciri' },
        { key: 'status', label: 'Status' },
        { key: 'id_posko', label: 'Id Posko' },
        { key: 'action', label: 'Action' },
      ],
      itemsKorban: [],
    }
  },
  name: 'Offline',
  components: {
    NavbarDashboard,
    Breadcrumb,
    BContainer,
  },
  mounted() {
    localStorage.getItem('loggedIn') !== 'true' ? this.$router.push('/') : ''

    this.getDataOffline()
  },
  methods: {
    truncateText(text, maxLength) {
      if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...'
      }
      return text
    },
    getDataOffline() {
      const offlineData = localStorage.getItem('offlineData')
      if (offlineData) {
        const data = JSON.parse(offlineData)
        this.divideDataByType(data)
      }
    },
    divideDataByType(data) {
      this.itemsPosko = data.filter((item) => item.from === 'posko')
      this.itemsKorban = data.filter((item) => item.from === 'korban')
    },
    submitFormDelete(item) {
      if (confirm(`Anda yakin untuk menghapus data offline ini?`)) {
        this.deleteData(item)
      }
    },
    deleteData(item) {
      const offlineData = localStorage.getItem('offlineData')
      if (offlineData) {
        const data = JSON.parse(offlineData)
        const updatedData = data.filter(
          (dataItem) => JSON.stringify(dataItem) !== JSON.stringify(item),
        )
        localStorage.setItem('offlineData', JSON.stringify(updatedData))
        this.getDataOffline()
      }
    },
    kirimFormPosko(item) {
      if (!navigator.onLine) {
        alert('Internet bermasalah, belum bisa mengirimkan data')
      } else {
        if (item.type === 'put') {
          axios
            .put(
              'http://localhost:8080/fyp/petugas/posko/put',
              {
                posko_id: item.id,
                nama_posko: item.nama_posko,
                nama_pj_posko: item.nama_pj_posko,
                hp_pj_posko: item.hp_pj_posko,
                alamat_posko: item.alamat_posko,
                gmaps_posko: item.gmaps_posko,
              },
              {
                headers: {
                  'Content-Type':
                    'application/x-www-form-urlencoded;charset=UTF-8,application/json',
                },
              },
            )
            .then(() => {
              alert('Data posko telah berhasil diubah')
              this.deleteData(item) // Pass the modified item to deleteData()
              this.$router.go(0)
            })
            .catch((error) => {
              if (error.response && error.response.status === 404) {
                // Handle 404 Not Found error
                console.log(error)
              }
            })
        } else if (item.type === 'post') {
          axios
            .post(
              'http://localhost:8080/fyp/petugas/posko/post',
              {
                nama_posko: item.nama_posko,
                nama_pj_posko: item.nama_pj_posko,
                hp_pj_posko: item.hp_pj_posko,
                alamat_posko: item.alamat_posko,
                gmaps_posko: item.gmaps_posko,
              },
              {
                headers: {
                  'Content-Type':
                    'application/x-www-form-urlencoded;charset=UTF-8,application/json',
                },
              },
            )
            .then((error) => {
              alert('Data posko telah berhasil ditambah')
              this.deleteData(item) // Pass the modified item to deleteData()
              this.$router.go(0)
              console.log(error)
            })
            .catch((error) => {
              if (error.response && error.response.status === 404) {
                // Handle 404 Not Found error
                console.log(error)
              }
            })
        }
      }
    },
    kirimFormKorban(item) {
      if (!navigator.onLine) {
        alert('Internet bermasalah, belum bisa mengirimkan data')
      } else {
        if (item.type === 'put') {
          axios
            .put(
              'http://localhost:8080/fyp/petugas/korban/put',
              {
                id: item.id,
                nama: item.nama,
                usia: item.usia,
                jenis_kelamin: item.jenis_kelamin,
                nik: item.nik,
                ciri_ciri: item.ciri_ciri,
                status: item.status,
                id_posko: item.id_posko,
              },
              {
                headers: {
                  'Content-Type':
                    'application/x-www-form-urlencoded;charset=UTF-8,application/json',
                },
              },
            )
            .then(() => {
              alert('Data korban telah berhasil diubah')
              this.deleteData(item) // Pass the modified item to deleteData()
              this.$router.go(0)
            })
            .catch((error) => {
              if (error.response && error.response.status === 404) {
                // Handle 404 Not Found error
                console.log(error)
              }
            })
        } else if (item.type === 'post') {
          axios
            .post(
              'http://localhost:8080/fyp/petugas/korban/post',
              {
                nama: item.nama,
                usia: item.usia,
                jenis_kelamin: item.jenis_kelamin,
                nik: item.nik,
                ciri_ciri: item.ciri_ciri,
                status: item.status,
                id_posko: item.id_posko,
              },
              {
                headers: {
                  'Content-Type':
                    'application/x-www-form-urlencoded;charset=UTF-8,application/json',
                },
              },
            )
            .then(() => {
              alert('Data korban telah berhasil ditambah')
              this.deleteData(item) // Pass the modified item to deleteData()
              this.$router.go(0)
            })
            .catch((error) => {
              if (error.response && error.response.status === 404) {
                // Handle 404 Not Found error
                console.log(error)
              }
            })
        }
      }
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card:hover {
  cursor: pointer;
}
</style>
