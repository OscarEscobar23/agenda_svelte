<script>
import Header from './views/Header.svelte';
import Modal from './views/Modal.svelte';
import Directory from './views/Agenda.svelte';
import userStore from './Controllers/directory-store';


let show = false;
let editedId;
let edited;


function toggle(){
  show = !show;
}
function startEdit(event){
  editedId = event.detail;
  show =!show;
}
function deleted(event){
  edited = event.detail;
  userStore.removeContact(edited);
}

</script>
<style>

	main{
        margin-top: 5rem;
    }
 
</style>

<Header/>
<main>
  <button on:click="{toggle}">Agregar Contacto</button>
{#if show}
<Modal id={editedId} on:save={toggle} on:closed={toggle}/>
{/if}
</main>
<Directory on:edit={startEdit} on:delete={deleted}/>
