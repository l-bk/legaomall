<template>
	<div >
		<div class="test" id='test'>
			la<br />
			la<br />
			la<br />
			la<br />
			la<br />
			la<br />
			la<br />
			la<br />
			
			la<br />la<br />
			la<br />
			la<br />
			la<br />
			la<br />
			la<br />la<br />
			la<br />la<br />la<br />la<br />la<br />la<br />la<br />la<br />la<br />la<br />la<br />la<br />
			la<br />
			
			la<br />
			la<br />la<br />
			la<br />la<br />la<br />
		</div>
	</div>
</template>

<script>
	export default{
		mounted(){
	
			
		window.addEventListener('scroll',this.scrollfunc,true);
		
		  
		},
		methods:{
			
	scrollfunc(){
				  	
			  var myscroll=document.getElementById("test").scrollTop;
              console.log(myscroll);
   },

     }      
}           
             
      
              
              
            
              
           
             
               
                                    
					 
</script>

<style>
	.test{
		height: 200px;
		width: 100%;
		overflow-y: auto;
	}
</style>