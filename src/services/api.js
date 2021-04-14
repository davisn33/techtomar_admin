import axios from "axios"
axios.defaults.baseURL="https://techtomarback.herokuapp.com/api"


export function login(email,password){
    return axios.post("auth/login",{email,password})
}


export function addCookies(eng_title,eng_description,ger_title,ger_description){
    return axios.post("admin/addcookies",{eng_title,eng_description,ger_title,ger_description})
}

export function getCookies(){
    return axios.get("user/getcookies")
}

export function addPolicy(eng_title,eng_description,ger_title,ger_description){
    return axios.post("admin/addpolicy",{eng_title,eng_description,ger_title,ger_description})
}


export function getPolicy(){
    return axios.get("user/getpolicy")
}

export function addSlider(title,img){
    let form = new FormData()
    form.append("title", title);
    form.append("img", img);
    return axios.post("admin/addslider",form);
}

export function getSlider(){
    return axios.get("user/getsliders");
}

export function deleteSlider(slider_id){
    return axios.post("admin/deleteslider",{slider_id});
}

