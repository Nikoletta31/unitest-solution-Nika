<template>
  <div>
    <div v-if="lives.length > 0" class="card mt-5">
      <div class="card-header bg-dark text-white pulse">
        <h4>
          Live(s) en cours
          <span class="badge bg-danger">{{ lives.length }}</span>
        </h4>
      </div>
      <div class="card-body">
        <p class="card-text"></p>
        <div
          class="card d-block mx-auto mt-2 mb-2"
          style="width: 18rem"
          v-for="live in lives"
          :key="live.id"
        >
          <div class="card-body" @click="goToLive(live.id)">
            <h4 class="card-title font-weight-bold text-justify">
              {{ live.name }}
            </h4>
            <ul class="list-group text-justify text-center">
              <li class="list-group-item">
                {{ live.nbMarkets }} marché(s) ouvert(s)
              </li>
              <li class="list-group-item">
                {{ live.nbSelections }} selection(s) ouverte(s)
              </li>
              <li class="list-group-item">
                {{ live.nbBets }} pari(s) enregistré(s)
              </li>
            </ul>
            <a class="btn btn-primary mt-3" @click="goToLive(live.id)"
              ><span style="color: white">Parier sur {{ live.name }}</span></a
            >
          </div>
        </div>
      </div>
    </div>
    <div class="card mt-5" v-else>
      <h5>Aucun événément n'est en direct</h5>
    </div>
  </div>
</template>

<script>
  import axios from "@/services/axios.js";

  export default {
    name: "Live",
    data() {
      return {
        lives: [],
      };
    },
    mounted() {
      this.fetchLives();
    },
    methods: {
      goToLive: function (id) {
        this.$router.push({ name: "livedetails", params: { id: id } });
      },
      fetchLives() {
        axios.get("/lives.json").then((res) => {
          this.lives = res.data;
        });
      },
    },
  };
</script>
