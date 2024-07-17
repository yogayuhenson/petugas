<template>
  <div>
    <NavbarDashboard />
    <b-container class="py-5">
      <b-row>
        <b-col cols="12">
          <h1>Data Korban</h1>
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
            <template #cell(action)="row">
              <b-button
                size="sm"
                v-b-modal.modal-edit
                @click="inputDataEditKorban(row.item)"
                variant="warning"
                class="mb-2"
              >
                <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                Ubah
              </b-button>

              <br />
              
              <b-button
                size="sm"
                @click="submitFormDelete(row.item.id, row.item.nama)"
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
      title="Tambah data korban"
      :cancel-title="'Batal'"
      :ok-title="'Tambah'"
      @ok="submitFormTambah()"
    >
      <b-form-group label="Nama korban:">
        <b-form-input
          v-model="formTambah.nama"
          :state="formValidation(formTambah.nama)"
          placeholder="Masukkan nama korban"
          required
        ></b-form-input>
        <b-form-invalid-feedback :state="formValidation(formTambah.nama)">
          Nama korban tidak boleh kosong
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group label="Usia korban:">
        <b-form-input
          v-model="formTambah.usia"
          :state="formValidation(formTambah.usia)"
          placeholder="Masukkan usia korban"
          type="number"
          required
        ></b-form-input>
        <b-form-invalid-feedback :state="formValidation(formTambah.usia)">
          Usia korban tidak boleh kosong
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group label="Jenis kelamin korban:">
        <b-form-select
          v-model="formTambah.jenis_kelamin"
          :options="jk_options"
          :state="formValidation(formTambah.jenis_kelamin)"
          required
        ></b-form-select>
        <b-form-invalid-feedback
          :state="formValidation(formTambah.jenis_kelamin)"
        >
          Jenis kelamin korban tidak boleh kosong
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group label="NIK korban:">
        <b-form-input
          v-model="formTambah.nik"
          placeholder="Masukkan nik korban"
          type="number"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Ciri-ciri korban:">
        <b-form-input
          v-model="formTambah.ciri_ciri"
          :state="formValidation(formTambah.ciri_ciri)"
          placeholder="Masukkan ciri-ciri korban"
          required
        ></b-form-input>
        <b-form-invalid-feedback :state="formValidation(formTambah.ciri_ciri)">
          Ciri-ciri korban tidak boleh kosong
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group label="Status korban:">
        <b-form-select
          v-model="formTambah.status"
          :options="status_options"
          :state="formValidation(formTambah.status)"
          placeholder="Masukkan status korban"
          required
        ></b-form-select>
        <b-form-invalid-feedback :state="formValidation(formTambah.status)">
          Status tidak boleh kosong
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group label="Lokasi:">
        <b-form-select
          v-model="formTambah.id_posko"
          :options="posko_options"
          :state="formValidation(formTambah.id_posko)"
          required
        ></b-form-select>
        <b-form-invalid-feedback :state="formValidation(formTambah.id_posko)">
          Lokasi tidak boleh kosong
        </b-form-invalid-feedback>
      </b-form-group>
    </b-modal>

    <!-- Modal Edit -->
    <b-modal
      id="modal-edit"
      title="Ubah data korban"
      :cancel-title="'Batal'"
      :ok-title="'Ubah'"
      @ok="submitFormEdit()"
    >
      <b-form-group label="Nama korban:">
        <b-form-input
          v-model="formEdit.nama"
          :state="formValidation(formEdit.nama)"
          placeholder="Masukkan nama korban"
          required
        ></b-form-input>
        <b-form-invalid-feedback :state="formValidation(formEdit.nama)">
          Nama korban tidak boleh kosong
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group label="Usia korban:">
        <b-form-input
          v-model="formEdit.usia"
          :state="formValidation(formEdit.usia)"
          placeholder="Masukkan usia korban"
          type="number"
          required
        ></b-form-input>
        <b-form-invalid-feedback :state="formValidation(formEdit.usia)">
          Usia korban tidak boleh kosong
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group label="Jenis kelamin korban:">
        <b-form-select
          v-model="formEdit.jenis_kelamin"
          :options="jk_options"
          :state="formValidation(formEdit.jenis_kelamin)"
          required
        ></b-form-select>
        <b-form-invalid-feedback
          :state="formValidation(formEdit.jenis_kelamin)"
        >
          Jenis kelamin korban tidak boleh kosong
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group label="NIK korban:">
        <b-form-input
          v-model="formEdit.nik"
          placeholder="Masukkan nik korban"
          type="number"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Ciri-ciri korban:">
        <b-form-input
          v-model="formEdit.ciri_ciri"
          :state="formValidation(formEdit.ciri_ciri)"
          placeholder="Masukkan ciri-ciri korban"
          required
        ></b-form-input>
        <b-form-invalid-feedback :state="formValidation(formEdit.ciri_ciri)">
          Ciri-ciri korban tidak boleh kosong
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group label="Status korban:">
        <b-form-select
          v-model="formEdit.status"
          :options="status_options"
          :state="formValidation(formEdit.status)"
          placeholder="Masukkan status korban"
          required
        ></b-form-select>
        <b-form-invalid-feedback :state="formValidation(formEdit.status)">
          Status tidak boleh kosong
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group label="Lokasi:">
        <b-form-select
          v-model="formEdit.id_posko"
          :options="posko_options"
          :state="formValidation(formEdit.id_posko)"
          required
        ></b-form-select>
        <b-form-invalid-feedback :state="formValidation(formEdit.id_posko)">
          Lokasi tidak boleh kosong
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
        { key: 'nama', label: 'Nama' },
        { key: 'usia', label: 'Usia' },
        { key: 'jenis_kelamin', label: 'Jenis Kelamin' },
        { key: 'nik', label: 'NIK' },
        { key: 'ciri_ciri', label: 'Ciri-ciri' },
        { key: 'status', label: 'Status' },
        { key: 'lokasi', label: 'Lokasi' },
        { key: 'action', label: 'Action' },
      ],
      jk_options: [
        { value: 'Laki-laki', text: 'Laki-laki' },
        { value: 'Perempuan', text: 'Perempuan' },
      ],
      status_options: [
        { value: 'Selamat', text: 'Selamat' },
        { value: 'Luka Ringan', text: 'Luka Ringan' },
        { value: 'Luka Berat', text: 'Luka Berat' },
        { value: 'Meninggal', text: 'Meninggal' },
      ],
      items: [],
      allItems: [],
      displayItems: [],
      formTambah: {
        nama: '',
        usia: '',
        jenis_kelamin: '',
        nik: '',
        ciri_ciri: '',
        status: '',
        id_posko: '',
      },
      formEdit: {
        nama: '',
        usia: '',
        jenis_kelamin: '',
        nik: '',
        ciri_ciri: '',
        status: '',
        id_posko: '',
      },
      limit: 5,
      totalPages: 0,
      posko_options: [],
    }
  },
  name: 'Korban',
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
      this.getDataPoskoOffline()
    }
  },
  methods: {
    usernameEnter() {
      this.$refs.password.focus()
    },
    goToPage(value) {
      this.$router.push('/' + value)
    },
    formValidation(value) {
      return value !== ''
    },
    submitFormTambah() {
      if (!navigator.onLine) {
        const offlineData = {
          from: 'korban',
          type: 'post',
          nama: this.formTambah.nama,
          usia: this.formTambah.usia,
          jenis_kelamin: this.formTambah.jenis_kelamin,
          nik: this.formTambah.nik,
          ciri_ciri: this.formTambah.ciri_ciri,
          status: this.formTambah.status,
          id_posko: this.formTambah.id_posko,
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
          'Internet anda bermasalah, Tambah Data korban telah ditambahkan ke Data Offline',
        )
      } else {
        axios
          .post(
            'http://localhost:8080/fyp/petugas/korban/post',
            {
              nama: this.formTambah.nama,
              usia: this.formTambah.usia,
              jenis_kelamin: this.formTambah.jenis_kelamin,
              nik: this.formTambah.nik,
              ciri_ciri: this.formTambah.ciri_ciri,
              status: this.formTambah.status,
              id_posko: this.formTambah.id_posko,
            },
            {
              headers: {
                'Content-Type':
                  'application/x-www-form-urlencoded;charset=UTF-8,application/json',
              },
            },
          )
          .then((response) => {
            alert('Data korban telah berhasil ditambah')
            console.log(response.data)
            this.$router.go(0)
          })
          .catch((error) => {
            if (error.response && error.response.status === 404) {
              // Handle 404 Not Found error
              console.log(error)
              this.clearFormTambah()
            }
          })
      }
    },
    clearFormTambah() {
      this.formTambah.nama = ''
      this.formTambah.usia = ''
      this.formTambah.jenis_kelamin = ''
      this.formTambah.nik = ''
      this.formTambah.ciri_ciri = ''
      this.formTambah.status = ''
      this.formTambah.id_posko = ''
    },
    inputDataEditKorban(data) {
      this.formEdit = {
        id: data.id,
        nama: data.nama,
        usia: data.usia,
        jenis_kelamin: data.jenis_kelamin,
        nik: data.nik,
        ciri_ciri: data.ciri_ciri,
        status: data.status,
        id_posko: data.id_posko,
      }
    },
    submitFormEdit() {
      if (!navigator.onLine) {
        const offlineData = {
          from: 'korban',
          type: 'put',
          id: this.formEdit.id,
          nama: this.formEdit.nama,
          usia: this.formEdit.usia,
          jenis_kelamin: this.formEdit.jenis_kelamin,
          nik: this.formEdit.nik,
          ciri_ciri: this.formEdit.ciri_ciri,
          status: this.formEdit.status,
          id_posko: this.formEdit.id_posko,
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
          'Internet anda bermasalah, Ubah Data korban telah ditambahkan ke Data Offline',
        )
      } else {
        axios
          .put(
            'http://localhost:8080/fyp/petugas/korban/put',
            {
              id: this.formEdit.id,
              nama: this.formEdit.nama,
              usia: this.formEdit.usia,
              jenis_kelamin: this.formEdit.jenis_kelamin,
              nik: this.formEdit.nik,
              ciri_ciri: this.formEdit.ciri_ciri,
              status: this.formEdit.status,
              id_posko: this.formEdit.id_posko,
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
            'http://localhost:8080/fyp/petugas/korban/delete',
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
          this.posko_options = response.data.map((json) => ({
            value: json.id,
            text: json.nama_posko,
          }))

          localStorage.setItem(
            'currentPoskoData',
            JSON.stringify(response.data),
          )

          this.getDataKorban()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getDataPoskoOffline() {
      this.posko_options = JSON.parse(
        localStorage.getItem('currentPoskoData'),
      ).map((json) => ({
        value: json.id,
        text: json.nama_posko,
      }))

      this.getDataKorbanOffline()
    },
    getDataKorbanOffline() {
      this.allItems = JSON.parse(localStorage.getItem('currentKorbanData')).map(
        (item, index) => {
          const posko = this.posko_options.find(
            (posko) => posko.value === item.id_posko,
          )
          const lokasiPosko = posko ? posko.text : ''
          return {
            ...item,
            no: index + 1,
            lokasi: lokasiPosko,
          }
        },
      )

      this.totalPages = Math.ceil(this.allItems.length / this.limit)
      this.currentPage = 1
      this.updateDisplayItems()
    },
    getDataKorban() {
      axios
        .get('http://localhost:8080/fyp/petugas/korban/get')
        .then((response) => {
          this.allItems = response.data.map((item, index) => {
            const posko = this.posko_options.find(
              (posko) => posko.value === item.id_posko,
            )
            const lokasiPosko = posko ? posko.text : ''
            return {
              ...item,
              no: index + 1,
              lokasi: lokasiPosko,
            }
          })

          localStorage.setItem(
            'currentKorbanData',
            JSON.stringify(response.data),
          )

          this.totalPages = Math.ceil(this.allItems.length / this.limit)
          this.currentPage = 1
          this.updateDisplayItems()
        })
        .catch((error) => {
          console.log(error)
        })
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
