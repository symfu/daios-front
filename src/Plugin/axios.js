import axios from 'axios'
import {
  Message
} from 'element-ui'
import Router from '../router/index' //用于个别页面处理
import util from '../lib/utils'
// 环境的切换
if (process.env.NODE_ENV == 'development') {
  // axios.defaults.baseURL = "http://cq308.holytoolz.com";
  axios.defaults.baseURL = process.env.VUE_APP_BASE_API;

} else if (process.env.NODE_ENV == 'production') {
  axios.defaults.baseURL = `http://${window.location.hostname}:8080`
}
// axios.defaults.timeout = 10000;
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest"
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  config => {

    return config;
  },
  error => {
    return Promise.error(error);
  })

let timer = null
// 响应拦截器
axios.interceptors.response.use(
  response => {
    if (response) {
      console.log('清除之前的定时器')
      window.clearTimeout(timer)
      timer = setTimeout(() => {
        console.log('说明收到相应了，超过1分没响应，退出')
        Router.replace('/login')
        window.location.reload()
        Message.success("由于您长时间未操作，即将回到登录页面");
        util.logout();
      }, 1000 * 60 * 30);
    }
    if (response.data.resCode === 10000) {
      return Promise.resolve(response);
    }
    if (response.data.resCode === -2010) {
      util.logout();
      Router.replace('/login')
      return Promise.resolve(response);
    } else {
      return Promise.resolve(response);
    }
  },
  error => {
    // if (error.response.data.resCode) {
    //   return Promise.reject(error.response);
    // }
  }
)

//get请求
export function axiosGet(url) {
  return new Promise(
    function (resolve, reject) {
      //console.log(axios.defaults);
      axios.get(url).then(res => {
        resolve(res.data);
      }).catch(err => {
        reject(err)
      })
    }
  )
}
//post请求
export function axiosPost(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err)
    })
  })
}
//put请求
export function axiosPut(url, params) {
  return new Promise((resolve, reject) => {
    axios.put(url, params).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err)
    })
  })
}

//delete请求
export function axiosDelete(url, params) {
  return new Promise((resolve, reject) => {
    axios.delete(url, {
      data: params
    }).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err)
    })
  })
}