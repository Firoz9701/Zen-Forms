import { use,useActionState } from "react"
import { OpinionsContext } from "../store/opinions-context"
import { useFormStatus } from "react-dom"
import Submit from "./Submit"

export function NewOpinion() {
  const {addOpinion} = use(OpinionsContext)


async function opinionFormHandle(prevState,formData){
    const userName = formData.get('userName')
    const title = formData.get('title')
    const body = formData.get('body')

    const errors= []
  if(userName === ''){
     errors.push('User Name should not be empty')
  }
  if(title === ''){
     errors.push('Please enter the title ')
  }
  if(body === ''){
     errors.push('Please add your opinion')
  }
  if(errors.length > 0){
    return { errors,enterdValues:{userName,title,body} }

  }

  // submit to backend
  await addOpinion({title,body,userName})

  return {errors:null}

  


  }
     const [formState,formAction,pending]      = useActionState(opinionFormHandle,{errors:null})
  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input type="text" id="userName" name="userName" defaultValue={formState.enterdValues?.name}/>
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" defaultValue={formState.enterdValues?.title} />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea id="body" name="body" rows={5} defaultValue={formState.enterdValues?.body}></textarea >
        </p>
        {formState.errors &&<ul className="errors">
             { formState.errors.map((error) => <li key={error}>{error}</li>)}
        </ul>}

       <Submit />
      </form>
    </div>
  );
}
