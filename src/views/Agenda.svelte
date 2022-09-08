<script>
  import userStore from '../Controllers/directory-store';
  import { createEventDispatcher } from 'svelte';
  import { fade, fly, slide, scale } from 'svelte/transition';
  import { cubicIn, bounceInOut } from 'svelte/easing';
  import { onMount } from 'svelte';
  import axios from 'axios';

  let load = userStore;
  let dispatch = createEventDispatcher();
   
  fetch(`http://127.0.0.1:8000/api/contactos`)
  .then(res =>{
    if(!res.ok){
      throw new Error('try again')
    }
    return res.json();
  })
  .then(data =>{
    let loadUsers =[];
    for (const id in data ){
      loadUsers.push({
        ...data[id]
        // id:id
      });
    }
    load.setMeetups(loadUsers.reverse());
  })
  .catch(err=>{
    console.log(err);
  })
  
  
  
  
</script>

<style>
    .userItem {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    border-radius: 5px;
    background: white;
    margin: 1rem;
    padding:1rem;
  }
  .usersGrid{
        width: 100%;
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 1rem;
    }
    @media (min-width: 768px){
        .usersGrid{
            grid-template-columns: repeat(3,1fr);
        }
    }
</style>

<div class="usersGrid">
    {#each $load as user (user.id)}
    <div class="userItem" transition:fly={{delay:250,duration:300,y:-500,easing:cubicIn}}>
      <p>{user.id}</p>
      <h4 >Nombre: {user.name}</h4>
      <p>Correo: {user.email}</p>
      <p>Telefono: {user.phone}</p>
      <button on:click={() => dispatch('edit',user.id)}>Editar</button>
    
    </div>
    {/each} 
</div>
