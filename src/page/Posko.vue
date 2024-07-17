<template>
  <div>
    <NavbarDashboard />
    <b-container class="py-5">
      <b-row>
        <b-col cols="12">
          <h1>Data Posko</h1>
        </b-col>

        <b-col cols="6">
          <Breadcrumb />
        </b-col>

        <b-col cols="6" class="text-right">
          <b-button
            size="sm"
            variant="success"
            class="mb-2"
            v-b-modal.modal-tambah
          >
            <i class="fa fa-plus-square" aria-hidden="true"></i>
            Tambah Data
          </b-button>
        </b-col>

        <b-col cols="12">
          <b-table :items="displayItems" :fields="fields" striped responsive>
            <template #cell(alamat_posko)="row">
              <span>{{ truncateText(row.item.alamat_posko, 60) }}</span>
            </template>
            <template #cell(gmaps_posko)="row">
              <span>{{ truncateText(row.item.gmaps_posko, 30) }}</span>
            </template>
            <template #cell(action)="row">
              <b-button
                size="sm"
                v-b-modal.modal-edit
                @click="inputDataEditPosko(row.item)"
                variant="warning"
                class="mb-2"
              >
                <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                Ubah
              </b-button>

              <br />
              
              <b-button
                size="sm"
                @click="submitFormDelete(row.item.id, row.item.nama_posko)"
                variant="danger"
              >
                <i class="fa fa-trash" aria-hidden="true"></i>
                Hapus
              </b-button>
            </template>
          </b-table>

          <b-pagination
            v-if="totalPages > 1"
            :total-rows="allItems.length"
            :per-page="limit"
            v-model="currentPage"
            @change="changePage"
          ></b-pagination>
        </b-col>
      </b-row>
    </b-container>

    <!-- Modal Tambah -->
    <b-modal
      id="modal-tambah"
      title="Tambah data posko"
      :cancel-title="'Batal'"
      :ok-title="'Tambah'"
      @ok="submitFormTambah()"
    >
      <b-form-group label="Nama posko:">
        <b-form-input
          v-model="formTambah.nama_posko"
          :state="formValidation(formTambah.nama_posko)"
          placeholder="Masukkan nama posko"
          required
        ></b-form-input>
        <b-form-invalid-feedback :state="formValidation(formTambah.nama_posko)">
          Nama posko tidak boleh kosong
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group label="Nama penanggungjawab:">
        <b-form-input
          v-model="formTambah.nama_pj_posko"
          :state="formValidation(formTambah.nama_pj_posko)"
          placeholder="Masukkan nama penanggungjawab"
          required
        ></b-form-input>
        <b-form-invalid-feedback
          :state="formValidation(formTambah.nama_pj_posko)"
        >
          Nama penanggungjawab tidak boleh kosong
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group label="Kontak penanggungjawab:">
        <b-form-input
          v-model="formTambah.hp_pj_posko"
          :state="formValidation(formTambah.hp_pj_posko)"
          placeholder="contoh: 081234567890"
          type="number"
          required
        ></b-form-input>
        <b-form-invalid-feedback
          :state="formValidation(formTambah.hp_pj_posko)"
        >
          Kontak penanggungjawab tidak boleh kosong
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group label="Alamat posko:">
        <b-form-textarea
          v-model="formTambah.alamat_posko"
          :state="formValidation(formTambah.alamat_posko)"
          placeholder="Masukkan alamat posko"
          rows="3"
          required
        ></b-form-textarea>
        <b-form-invalid-feedback
          :state="formValidation(formTambah.alamat_posko)"
        >
          Alamat posko tidak boleh kosong
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group label="Gmaps posko:">
        <b-form-textarea
          v-model="formTambah.gmaps_posko"
          :state="formValidation(formTambah.gmaps_posko)"
          placeholder="Masukkan gmaps posko"
          rows="3"
          max-rows="6"
          required
        ></b-form-textarea>
        <b-form-invalid-feedback
          :state="formValidation(formTambah.gmaps_posko)"
        >
          Gmaps posko tidak boleh kosong
        </b-form-invalid-feedback>
      </b-form-group>
    </b-modal>

    <!-- Modal Edit -->
    <b-modal
      id="modal-edit"
      title="Ubah data posko"
      :cancel-title="'Batal'"
      :ok-title="'Ubah'"
      @ok="submitFormEdit()"
    >
      <b-form-group label="Nama posko:">
        <b-form-input
          v-model="formEdit.nama_posko"
          :state="formValidation(formEdit.nama_posko)"
          required
        ></b-form-input>
        <b-form-invalid-feedback :state="formValidation(formEdit.nama_posko)">
          Nama posko tidak boleh kosong
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group label="Nama penanggungjawab:">
        <b-form-input
          v-model="formEdit.nama_pj_posko"
          :state="formValidation(formEdit.nama_pj_posko)"
          required
        ></b-form-input>
        <b-form-invalid-feedback
          :state="formValidation(formEdit.nama_pj_posko)"
        >
          Nama penanggungjawab tidak boleh kosong
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group label="Kontak penanggungjawab:">
        <b-form-input
          v-model="formEdit.hp_pj_posko"
          :state="formValidation(formEdit.hp_pj_posko)"
          type="number"
          required
        ></b-form-input>
        <b-form-invalid-feedback :state="formValidation(formEdit.hp_pj_posko)">
          Kontak penanggungjawab tidak boleh kosong
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group label="Alamat posko:">
        <b-form-textarea
          v-model="formEdit.alamat_posko"
          :state="formValidation(formEdit.alamat_posko)"
          rows="3"
          required
        ></b-form-textarea>
        <b-form-invalid-feedback :state="formValidation(formEdit.alamat_posko)">
          Alamat posko tidak boleh kosong
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group label="Gmaps posko:">
        <b-form-textarea
          v-model="formEdit.gmaps_posko"
          :state="formValidation(formEdit.gmaps_posko)"
          rows="3"
          max-rows="6"
          required
        ></b-form-textarea>
        <b-form-invalid-feedback :state="formValidation(formEdit.gmaps_posko)">
          Gmaps posko tidak boleh kosong
        </b-form-invalid-feedback>
      </b-form-group>
    </b-modal>
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
      fields: [
        { key: 'no', label: 'No' },
        { key: 'nama_posko', label: 'Nama Posko' },
        { key: 'nama_pj_posko', label: 'Penanggung Jawab' },
        { key: 'hp_pj_posko', label: 'Kontak' },
        { key: 'alamat_posko', label: 'Alamat' },
        { key: 'gmaps_posko', label: 'Gmaps' },
        { key: 'action', label: 'Action' },
      ],
      allItems: [],
      displayItems: [],
      formTambah: {
        nama_posko: '',
        nama_pj_posko: '',
        hp_pj_posko: '',
        alamat_posko: '',
        gmaps_posko: '',
      },
      formEdit: {
        nama_posko: '',
        nama_pj_posko: '',
        hp_pj_posko: '',
        alamat_posko: '',
        gmaps_posko: '',
      },
      limit: 5,
      totalPages: 0,
    }
  },
  name: 'Posko',
  components: {
    NavbarDashboard,
    Breadcrumb,
    BContainer,
  },
  mounted() {
    localStorage.getItem('loggedIn') !== 'true' ? this.$router.push('/') : ''

    if (navigator.onLine) {
      this.getDataPosko()
    } else {
      this.getDataOffline()
    }
  },
  methods: {
    truncateText(text, maxLength) {
      if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...'
      }
      return text
    },
    usernameEnter() {
      this.$refs.password.focus()
    },
    formValidation(value) {
      return value !== ''
    },
    submitFormTambah() {
      if (Object.values(this.formTambah).some((value) => value === '')) {
        alert('Data harus lengkap')
        return
      }

      if (!navigator.onLine) {
        const offlineData = {
          from: 'posko',
          type: 'post',
          nama_posko: this.formTambah.nama_posko,
          nama_pj_posko: this.formTambah.nama_pj_posko,
          hp_pj_posko: this.formTambah.hp_pj_posko,
          alamat_posko: this.formTambah.alamat_posko,
          gmaps_posko: this.formTambah.gmaps_posko,
        }

        let offlineDataList = localStorage.getItem('offlineData')
        if (offlineDataList) {
          // Append new data to existing offline data
          offlineDataList = JSON.parse(offlineDataList)
          offlineDataList.push(offlineData)
        } else {
          // Create new offline data list
          offlineDataList = [offlineData]
        }

        localStorage.setItem('offlineData', JSON.stringify(offlineDataList))
        this.clearFormTambah()
        alert(
          'Internet anda bermasalah, Tambah Data posko telah ditambahkan ke Data Offline',
        )
      } else {
        axios
          .post(
            'http://localhost:8080/fyp/petugas/posko/post',
            {
              nama_posko: this.formTambah.nama_posko,
              nama_pj_posko: this.formTambah.nama_pj_posko,
              hp_pj_posko: this.formTambah.hp_pj_posko,
              alamat_posko: this.formTambah.alamat_posko,
              gmaps_posko: this.formTambah.gmaps_posko,
            },
            {
              headers: {
                'Content-Type':
                  'application/x-www-form-urlencoded;charset=UTF-8,application/json',
              },
            },
          )
          .then(() => {
            alert('Data posko telah berhasil ditambah')
            this.$router.go(0)
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    clearFormTambah() {
      this.formTambah.nama_posko = ''
      this.formTambah.nama_pj_posko = ''
      this.formTambah.hp_pj_posko = ''
      this.formTambah.alamat_posko = ''
      this.formTambah.gmaps_posko = ''
    },
    inputDataEditPosko(data) {
      this.formEdit = {
        id: data.id,
        nama_posko: data.nama_posko,
        nama_pj_posko: data.nama_pj_posko,
        hp_pj_posko: data.hp_pj_posko,
        alamat_posko: data.alamat_posko,
        gmaps_posko: data.gmaps_posko,
      }
    },
    submitFormEdit() {
      if (Object.values(this.formEdit).some((value) => value === '')) {
        alert('Data harus lengkap')
        return
      }

      if (!navigator.onLine) {
        const offlineData = {
          from: 'posko',
          type: 'put',
          posko_id: this.formEdit.id,
          nama_posko: this.formEdit.nama_posko,
          nama_pj_posko: this.formEdit.nama_pj_posko,
          hp_pj_posko: this.formEdit.hp_pj_posko,
          alamat_posko: this.formEdit.alamat_posko,
          gmaps_posko: this.formEdit.gmaps_posko,
        }

        let offlineDataList = localStorage.getItem('offlineData')
        if (offlineDataList) {
          // Append new data to existing offline data
          offlineDataList = JSON.parse(offlineDataList)
          offlineDataList.push(offlineData)
        } else {
          // Create new offline data list
          offlineDataList = [offlineData]
        }

        localStorage.setItem('offlineData', JSON.stringify(offlineDataList))
        this.clearFormEdit()
        alert(
          'Internet anda bermasalah, Ubah Data posko telah ditambahkan ke Data Offline',
        )
      } else {
        axios
          .put(
            'http://localhost:8080/fyp/petugas/posko/put',
            {
              posko_id: this.formEdit.id,
              nama_posko: this.formEdit.nama_posko,
              nama_pj_posko: this.formEdit.nama_pj_posko,
              hp_pj_posko: this.formEdit.hp_pj_posko,
              alamat_posko: this.formEdit.alamat_posko,
              gmaps_posko: this.formEdit.gmaps_posko,
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
            this.$router.go(0)
          })
          .catch((error) => {
            if (error.response && error.response.status === 404) {
              // Handle 404 Not Found error
              console.log(error)
              this.clearFormEdit()
            }
          })
      }
    },
    clearFormEdit() {
      this.formTambah.nama_posko = ''
      this.formTambah.nama_pj_posko = ''
      this.formTambah.hp_pj_posko = ''
      this.formTambah.alamat_posko = ''
      this.formTambah.gmaps_posko = ''
    },
    submitFormDelete(id, name) {
      if (confirm(`Anda yakin untuk menghapus data ${name} ini?`)) {
        axios
          .post(
            'http://localhost:8080/fyp/petugas/posko/delete',
            {
              id: id,
            },
            {
              headers: {
                'Content-Type':
                  'application/x-www-form-urlencoded;charset=UTF-8,application/json',
              },
            },
          )
          .then(() => {
            alert(`Data ${name} telah dihapus`)
            this.$router.go(0)
          })
          .catch((error) => {
            if (error.response && error.response.status === 404) {
              // Handle 404 Not Found error
              console.log(error)
            }
          })
      }
    },
    getDataPosko() {
      axios
        .get('http://localhost:8080/fyp/petugas/posko/get')
        .then((response) => {
          this.allItems = response.data.map((item, index) => {
            return {
              ...item,
              no: index + 1,
            }
          })

          localStorage.setItem('currentPoskoData', JSON.stringify(response.data))

          this.totalPages = Math.ceil(this.allItems.length / this.limit)
          this.currentPage = 1
          this.updateDisplayItems()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getDataOffline() {
      this.allItems = JSON.parse(localStorage.getItem('currentPoskoData')).map((item, index) => {
        return {
          ...item,
          no: index + 1,
        }
      })

      this.totalPages = Math.ceil(this.allItems.length / this.limit)
      this.currentPage = 1
      this.updateDisplayItems()
    },
    changePage(page) {
      this.currentPage = page
      this.updateDisplayItems()
    },
    updateDisplayItems() {
      const startIndex = (this.currentPage - 1) * this.limit
      const endIndex = startIndex + this.limit
      this.displayItems = this.allItems.slice(startIndex, endIndex)
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
