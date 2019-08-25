<template>
  <div class="m-iselect">
    <span class="name">按省份选择：</span>
    <el-select v-model="pvalue" placeholder="省份">
      <el-option
        v-for="item in province"
        :key="item.vaule"
        :label="item.label"
        :value="item.place"
      />
    </el-select>
    <el-select v-model="cvalue" :disabled="!city.length" placeholder="城市">
      <el-option v-for="item in city" :key="item.vaule" :label="item.label" :value="item.place" />
    </el-select>
    <span class="name">&nbsp;&nbsp;&nbsp;&nbsp;中文搜索：</span>
    <el-autocomplete
      v-model="input"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入城市中文或拼音"
      @select="handleSelect"
    ></el-autocomplete>
  </div>
</template>
<script>
import _ from "lodash";
export default {
  data() {
    return {
      province: [],
      city: [],
      pvalue: "",
      cvalue: "",
      input: "",
      cities: []
    };
  },
  mounted: async function() {
    let self = this;
    let {
      status,
      data: { province }
    } = await self.$axios.get("/geo/province");
    if (status === 200) {
      self.province = province.map(item => {
        return {
          value: item.id,
          label: item.name
        };
      });
    }
  },
  watch: {
    pvalue: async function(newPvalue) {
      let self = this;
      console.log("333", newPvalue);
      let {
        status,
        data: { city }
      } = await self.$axios.get(`/geo/province/${newPvalue}`);
      if (status === 200) {
        self.city = city.map(item => {
          return {
            value: item.id,
            label: item.name
          };
        });
        self.cvalue = "";
      }
    }
  },
  methods: {
    querySearchAsync: _.debounce(async function(query, callback) {
      let self = this;
      if (self.city.length) {
        callback(self.cities.filter(item => item.value.indexOf(query) > -1));
      } else {
        let {
          status,
          data: { city }
        } = await self.$axios.get("/geo/city");
        if (status === 200) {
          self.cities = city.map(item => {
            return {
              value: item.name
            };
          });
          callback(self.cities.filter(item => item.value.indexOf(query) > -1));
        } else {
          callback([]);
        }
      }
    }, 200),
    handleSelect: function() {
      window.location.href = "/";
    }
  }
};
</script>
<style lang="scss">
@import "@/assets/css/changeCity/iselect.scss";
</style>