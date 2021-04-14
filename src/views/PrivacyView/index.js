import { Button, TextareaAutosize, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import {useState,useEffect} from 'react'
import {addPolicy,getPolicy} from "../../services/api"


const Policy = () => {
    const classes = useStyles();
    const [heading,setHeading] = useState("");
    const [content,setContent] = useState("");
    const [gheading,setGheading] = useState("");
    const [gcontent,setGcontent] = useState("");

    useEffect(()=>{
        getPolicy()
        .then(res=>{
            console.log("policy",res.data)
            setHeading(res.data.cookies.eng_title);
            setContent(res.data.cookies.eng_description);
            setGheading(res.data.cookies.ger_title);
            setGcontent(res.data.cookies.ger_description);
        })
    },[])

    const handleSubmit=()=>{
        addPolicy(heading,content,gheading,gcontent)
        .then((res)=>{
            console.log(res.data);
        })
    }

    return (
        <div className={classes.root}>
            <h2>Policy</h2>
            <TextField value={heading} style={{marginTop:10}} variant="outlined" label="Heading" onChange={(e)=>setHeading(e.target.value)}/>
            <TextField value={content} style={{marginTop:10}} variant="outlined" label="Content" onChange={(e)=>setContent(e.target.value)} multiline rows={6} />
            <TextField value={gheading} style={{marginTop:10}} variant="outlined" label="German Heading" onChange={(e)=>setGheading(e.target.value)}/>
            <TextField value={gcontent} style={{marginTop:10}} variant="outlined" label="German Content" onChange={(e)=>setGcontent(e.target.value)} multiline rows={6} />
            <Button variant="contained" style={{marginTop:10,width:200,color:"white"}} color="primary" type="submit" onClick={handleSubmit}>Submit</Button>
        </div>
    )
}


const useStyles = makeStyles({
    root: {
      display:"flex",
      flexDirection:"column",
      padding:20,
    },
  });

export default Policy
