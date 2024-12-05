"use client"
import React, { useState } from 'react'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { chatSession } from '@/utils/GeminiAiModal'
import { v4 as uuidv4 } from 'uuid';
import {useUser} from '@clerk/nextjs';
import moment from 'moment';
import { AiInterview } from '@/utils/schema'

function AddNewInterview() {
    const [openDailog,setOpenDialog]=useState(false)
    const [jobPosition,setJobPosition] = useState();
    const [jobDesc,setJobDesc] = useState();
    const [jobExperience,setJobExperience] = useState();
    const [loading,setLoading]=useState(false);
    const [jsonResponse,setJsonResponse]=useState([]);
    const {user}=useUser();

    const onSubmit=async(e)=>{
        setLoading(true)
        e.preventDefault()
        console.log(jobDesc,jobExperience,jobPosition)

        const InputPrompt="Job position:"+jobPosition+", Job Description: "+jobDesc+" Years Of Experience : "+jobExperience+" , Depends on Job Position, JobDescription & Years Of Experience give us "+process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT+" Interview question along with Answer in JSON format, Give us question and answer field on JSON"

        const result=await chatSession.sendMessage(InputPrompt);
        const JsonResp=(result.response.text()).replace('```json','').replace('```','')
        console.log(JSON.parse(JsonResp));
        setJsonResponse(JsonResp);

        if(AiInterview){
        const resp=await db.insert(AiInterview)
        .values({
            mockId:uuidv4(),
            jsonResponse:JsonResp,
            jobPosition:jobPosition,
            jobDesc:jobDesc,
            jobExperience:jobExperience,
            createdBy:user?.primaryEmailAddress?.emailAddress,
            createdAt:moment().format('DD-MM-yyyy')
        }).returning({mockId:AiInterview.mockId})
        console.log("Inserted Id:",resp)
        if(resp){
            setOpenDialog(false);
        }
    }
    else{
        console.log("Error");
    }
        setLoading(false);
    }
  return (
    <div>
      <div className='p-10 border rounded-lg bg-secondary
      hover:scale—105 hover:shadow-md cursor—pointer transition-all
      'onClick={()=>setOpenDialog(true)}>
        <h2 className=' font-bold text—lg text-center' >+ Add New</h2>
      </div>
      <Dialog open={openDailog}>
  
  <DialogContent className="max-w-2xl">
    <DialogHeader>
      <DialogTitle className="text-2xl">Tell us more about your job interveiwing</DialogTitle>
      <DialogDescription >
        <form onSubmit={onSubmit}>
        <div>
       
        <h2>Add Details about yout job position/ role,Job Description and years of experience</h2>
        <div className='mt-7 my-3'>
            <label>Job Role /Job position</label>
            <Input placeholder="Ex. Full Stack Devolper" required
            onChange={(event)=>setJobPosition(event.target.value)}
            />
        </div>
        <div className='my-3'>
            <label>Job Description/Tech Stack (In Short)</label>
            <Textarea placeholder="Ex. React, Angular, NodeJs, MySql etc" required
             onChange={(event)=>setJobDesc(event.target.value)}
            />
        </div>
        <div className=' my-3'>
            <label>Years of experience </label>
            <Input placeholder="Ex.5" max="50" type="number" required
             onChange={(event)=>setJobExperience(event.target.value)}
            />
        </div>
        </div>
        <div className='flex gap-5 justify-end'>
        <Button type = "submit" disabled={loading}>
        {loading?
        <>
        <LoaderCircte className='animate-spin'/>'Generating from AI'
        </>:'Start Interview'
        }

            </Button>
            <Button variant="ghost" type = "button" onClick={()=>setOpenDialog(false)}>Cancel</Button>
        </div>
        </form>
      </DialogDescription>

    </DialogHeader>
  </DialogContent>
</Dialog>

    </div>
  )
}

export default AddNewInterview
