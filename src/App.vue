<template>
  <div id="app">
      <div class="links">
          <router-link to="/Main"> Main </router-link>
          <router-link to="FirstSeason"> FirstSeason </router-link>
          <router-link to="SecondSeason"> SecondSeason </router-link>
          <router-link to="ThirdSeason"> ThirdSeason </router-link>
          <router-link to="FourthSeason"> FourthSeason </router-link>
          <router-link to="Characters"> Characters </router-link>
      </div>
    <router-view/>
  </div>
</template>

<style lang="less">
@import "assets/styles";
</style>
