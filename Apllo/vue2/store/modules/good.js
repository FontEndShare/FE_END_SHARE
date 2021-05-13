import axios from "axios";

export default {
    state:{
        goodAllList:[], // 所有数据
        goodList:[], // 分页数据
        pageInfo:{
            page:0,// 当前页数据
            size:20,// 每页的数据
        }
    },
    getters:{
        goodAllList(state,getters,rootstate){
            return state.goodAllList;
            // 返回1000条数据
        },
        goodList(state){
            return state.goodList;
        },
        pageInfo(state){
            return state.pageInfo;
        }
    },
    mutations:{
        getGoodItem(state,result){
            state.goodAllList = [];
            state.goodList = [];
            let {name,price,des} = result;
            for (let i = 0; i < 999; i++) {
                state.goodAllList.push({
                    index:i+1,
                    name:`${name}${i + 1}`,
                    price:`${price + i}`,
                    des:`第${i+1}${des}`
                })
            }
        },
        getGoodListByParam(state,params){
            let {page} = params;
            let {size} = state.pageInfo;
            console.log({...params});
            let startPage = page * size;
            let endPage= (page + 1) * size;

            state.pageInfo.page = page;

            let curGoodList = state.goodAllList.slice(startPage,endPage);
            
            state.goodList = [...state.goodList,...curGoodList];
        }
    },
    actions:{
        getAllGoodList({commit,dispatch,state}){
            axios.get("/api/good.json").then(res=>{
                if(200 == res.status){
                    commit("getGoodItem",res.data)
                }
            }).then(()=>{
                dispatch("getGoodListByParam",{page:0,size:state.pageInfo.size});
            });
        },
        getGoodListByParam({commit},params){
            commit("getGoodListByParam",params);
        }
    }
}