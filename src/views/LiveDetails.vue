<template>
  <div class="card mt-5">
    <div class="card-header bg-dark text-white pulse">
      Real Madris vs PSG (en cours)
    </div>
    <div class="card-body">
      <p class="card-text"></p>
      <div class="container">
        <h4>Résultat du match</h4>
        <div v-if="liveResults.length" class="row">
          <div
            v-for="result in liveResults"
            :key="result.id"
            :class="liveResults.length > 3 ? 'col-12 mb-1' : 'col'"
          >
            <div class="card bg-primary text-white h-100">
              <div class="card-body">
                <p class="card-text">
                  {{ result.name }} : {{ result.currentOdd }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <h5>Aucun pari sur le résultat du match</h5>
        </div>
        <br />
        <h4>Buteur</h4>
        <div v-if="livePlayers.length">
          <div v-for="player in livePlayers" :key="player.id" class="row mt-1">
            <div class="card bg-primary text-white h-100 col">
              <div class="card-body">
                {{ player.name }} : {{ player.currentOdd }}
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <h5>Aucun pari sur des buteurs</h5>
        </div>
      </div>
      <router-link to="/lives" class="btn btn-light"
        >Retour aux lives</router-link
      >
    </div>
  </div>
</template>

<script>
  import axios from "@/services/axios.js";

  // Declaration of string variables in order to have less mistakes in typography
  const LIVE_RESULTS = "Résultat du match";
  const LIVE_PLAYERS = "Buteur dans le match";

  export default {
    name: "LiveDetails",
    data() {
      return {
        selections: [],
        liveId: null,
      };
    },
    mounted() {
      this.liveId = parseInt(this.$route.params.id);
      this.fetchSelections();
    },
    computed: {
      liveResults() {
        return this.selections.filter(
          (selection) => selection.market.name === LIVE_RESULTS
        );
      },
      livePlayers() {
        return this.selections.filter(
          (selection) => selection.market.name === LIVE_PLAYERS
        );
      },
    },
    methods: {
      fetchSelections() {
        axios.get("/selections.json").then((res) => {
          this.selections = res.data.filter(
            (selection) => selection.market.event.id === this.liveId
          );
        });
      },
    },
  };
</script>
