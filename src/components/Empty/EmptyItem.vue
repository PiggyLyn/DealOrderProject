<template>
   <div class="no_data_container">
       <div>
           <img src="@/assets/emty/nodata.png" alt="">
       </div>
       <div class="nodata_title">暂无数据</div>
    </div>
</template>

<style  lang='scss' scoped>
.no_data_container{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 5rem;
 
  
  // background-color: #ffffff;

  img{
    width: 15.3em;
    // height: 15.3rem;
  }
  .nodata_title{
    color: #030300;
    font-size: 1.8rem;
    font-weight: normal;
    margin-top: 1.3rem;
  }
  
}
</style>