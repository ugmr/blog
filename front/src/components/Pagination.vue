<template>
  <div class="pagination">
    <ul class="index">
      <li class="index-item" :class="showPrev ? '' : 'hide'">
        <button @click="handlePrev">&lt;&lt;</button>
      </li>
      <li
        :class="isSym(index) ? '' : 'index-item'"
        v-for="index in visibleIndexArray"
        :key="index"
      >
        <button @click="handleChange(index)">{{ index }}</button>
      </li>
      <li class="index-item" :class="showNext ? '' : 'hide'">
        <button @click="handleNext">&gt;&gt;</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["currentPage", "pageSize", "total"],
  data() {
    return {
      // 每一侧有多少个页码
      numPerSide: 4,
    };
  },
  computed: {
    //是否显示上一页
    showPrev() {
      return this.currentPage > 1;
    },
    // 是否显示下一页
    showNext() {
      return this.currentPage < this.indexNum;
    },
    // 可见的页码数组
    visibleIndexArray() {
      let visibleIndexArray = this.indexArray;
      if (visibleIndexArray.length >= this.numPerSide + 1) {
        if (visibleIndexArray[1] > visibleIndexArray[0] + 1)
          visibleIndexArray.splice(1, 0, "...");
        if (
          visibleIndexArray[visibleIndexArray.length - 1] >
          visibleIndexArray[visibleIndexArray.length - 2] + 1
        ) {
          visibleIndexArray.splice(visibleIndexArray.length - 1, 0, "...");
        }
      }
      return this.indexArray;
    },
    // 总共的页数
    indexNum() {
      return Math.ceil(this.total / this.pageSize);
    },
    // 可以看到的页数
    visibleIndexCount() {
      let count = 1;
      if (this.currentPage <= this.indexNum - this.numPerSide)
        count += this.numPerSide;
      else count += this.indexNum - this.currentPage;
      if (this.currentPage >= this.numPerSide) count += this.numPerSide;
      else count += this.currentPage - 1;
      return count;
    },
    // 页码数组
    indexArray() {
      let array = Array(this.visibleIndexCount).fill(0);
      // 第一位是1
      array[0] = 1;
      let index = 1;
      // 完整
      if (this.visibleIndexCount >= 1 + 2 * this.numPerSide) {
        for (
          let i = this.currentPage - this.numPerSide + 1;
          i <= this.currentPage + this.numPerSide - 1;
          i++
        ) {
          array[index++] = i;
        }
        array[index] = this.indexNum;
        // 只有一侧  1 .. 26 27 28 29 , 1 2 3 4 .. 29, 1 2 3 4 5
      } else if (this.visibleIndexCount <= this.numPerSide + 1) {
        if (this.indexNum > this.numPerSide + 1) {
          if (this.currentPage === 1) {
            for (let i = 2; i <= this.numPerSide; i++) {
              array[index++] = i;
            }
            array[index] = this.indexNum;
          } else {
            for (
              let i = this.indexNum - this.numPerSide + 1;
              i <= this.indexNum;
              i++
            ) {
              array[index++] = i;
            }
          }
          //  1 2 3 4 5
        } else {
          for (let i = 2; i <= this.indexNum; i++) {
            array[index++] = i;
          }
        }
        // 一侧不完整
      } else {
        // 左侧
        if (this.currentPage < this.numPerSide) {
          for (let i = 2; i <= this.currentPage + this.numPerSide - 1; i++) {
            array[index++] = i;
          }
          array[index] = this.indexNum;
        } else {
          for (
            let i = this.currentPage - this.numPerSide + 1;
            i <= this.indexNum;
            i++
          ) {
            array[index++] = i;
          }
        }
      }
      return array;
    },
  },
  methods: {
    isSym(index) {
      return Number.isNaN(index);
    },
    handlePrev() {
      this.$emit("handlePageChange", this.currentPage - 1);
    },
    handleNext() {
      this.$emit("handlePageChange", this.currentPage + 1);
    },
    handleChange(index) {
      if(index === this.currentPage) return
      this.$emit("handlePageChange", index);
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  width: 100%;
  margin: 15px 0;
  font-size: 14px;
  .index-item {
    display: inline-block;
    button {
      height: 30px;
      padding: 0 10px;
      border: none;
      outline: none;
      background: #fff;
      &:active,
      &:hover {
        background: #efefef;
        cursor: pointer;
      }
    }
  }
  .hide {
    display: none;
  }
}
</style>