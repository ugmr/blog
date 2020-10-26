<template>
  <div class="comment">
    <div class="pull-left">
      <img class="avatar" :src="defaultAvator">
    </div>
    <div class="comment-box">
      <div class="comment-trigger">
        <strong><a target="_blank" href="javascript:void(0)">{{comment.displayName}}</a></strong>
        <span class="comment-date">  ·  {{comment.repliedAt | dataFormat}}</span>
      </div>
      <div class="comment-content">
        <p>{{comment.content}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props: ['comment'],
    data(){
        return {
            defaultAvator: 'https://github.githubassets.com/images/search-key-slash.svg'
        }
    },
    filters: {
        dataFormat(date){
            return date.slice(0,10) + ' ' + date.slice(12, 19)
        }
    },
};
</script>

<style>
.comment {
    margin-top: 10px;
}
img {
  border: 0;
  vertical-align: middle;
}
.pull-left {
  float: left !important;
}
.pull-right {
  float: right !important;
}
.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}
.comment-box {
    text-align: left;
  padding-left: 47px;
}
.comment-box strong {
  font-weight: bold;
}
.comment-trigger {
  margin-bottom: 10px;
  color: #999;
  font-size: 13px;
}
.comment-content {
  line-height: 1.6;
  word-wrap: break-word;
  margin-bottom: 10px !important;
}
.comment-content::before,
.comment-content::after {
  display: table;
}
.comment-content::after {
  content: "";
  clear: both;
}
</style>