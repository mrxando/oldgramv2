const posts = [
    {
        name: "Vincent van Gogh",
        username: "vincey1853",
        location: "Zundert, Netherlands",
        avatar: "images/avatar-vangogh.jpg",
        post: "images/post-vangogh.jpg",
        comment: "just took a few mushrooms lol",
        likes: 21,
         replies: [
                  {
                handle: `TomCruise`,
                commentText: `Yes! Give me TOO!`,
            },
                  {
                handle: `ChuckNorris`,
                commentText: `Nice photo bro!`,
            },
        ],
        id: "1",
        isLiked: false
    },
    {
        name: "Gustave Courbet",
        username: "gus1819",
        location: "Ornans, France",
        avatar: "images/avatar-courbet.jpg",
        post: "images/post-courbet.jpg",
        comment: "i'm feelin a bit stressed tbh",
        likes: 4,
         replies: [{
                handle: `LaMadreTeresa`,
                commentText: `Are you all right?`,
            }],
        id: "2",
        isLiked: false
    },
        {
        name: "Joseph Ducreux",
        username: "jd1735",
        location: "Paris, France",
        avatar: "images/avatar-ducreux.jpg",
        post: "images/post-ducreux.jpg",
        comment: "gm friends! which coin are YOU stacking up today?? post below and WAGMI!",
        likes: 152,
         replies: [],
        id: "3",
        isLiked: false
    }
]
const container = document.getElementById('container');


document.addEventListener('click', function(e){
    if(e.target.dataset.like){
       handleLikeClick(e.target.dataset.like) 
    }else if(e.target.dataset.comment){
        handleReplyClick(e.target.dataset.comment)
    }else if(e.target.dataset.add){
        renderAdd()
    }else if(e.target.dataset.home){
        render()
    }else if(e.target.dataset.addPhoto){
        console.log("cliked")
    }
})



function handleLikeClick(postID){
    const targetPostObj = posts.filter(function(post){
        return post.id === postID
    })[0]
     if (targetPostObj.isLiked){
        targetPostObj.likes--
    }
    else{
        targetPostObj.likes++  
    }
    targetPostObj.isLiked = !targetPostObj.isLiked
    render()
    }
    
function handleReplyClick(postID){
    document.getElementById(`replies-${postID}`).classList.toggle('hidden')
}

function generatePost(){  
    let postHTML = ""
     posts.forEach(function(post){
     let likeIconClass = 'fa-regular'
     let redIcon = ''
      if (post.isLiked){
            likeIconClass = 'fa-solid'
            redIcon = 'liked'
        }
        let repliesHtml = ''
        if(post.replies.length > 0){
            post.replies.forEach(function(reply){
                repliesHtml+=`
<div class="photo-comments">
    <div class="photo-inner">
            <div>
                <p><span class='user-name'> ${reply.handle} </span> ${reply.commentText}</p>
            </div>
        </div>
</div>
`
            })}
        
        
    postHTML += `
        <div class='postDiv' id = ${post.id} >
            <img class='avatar-pic' src= ${post.avatar} alt= ${post.name} width='40' height='40'>
            <div class='user-div'>
                <h5>${post.name} </h5>
                <p>${post.location}</p>
            </div>
        </div>           
        <img class='gram-post' src= ${post.post} alt= ${post.name} width='350' height='350'/>       
        <div class='icon-div'>
            <i class="icon ${likeIconClass} fa-heart fa-2xl ${redIcon}" data-like="${post.id}"></i>
            <i class="icon fa-regular fa-comment fa-2xl" data-comment="${post.id}"></i>
        </div>         
        <div class='comments-div'>
            <p class='likes'>${post.likes} likes</p>
            <p><span class='user-name'> ${post.username} </span> ${post.comment}</p>
        </div>
        <div class="hidden" id="replies-${post.id}">
        ${repliesHtml}
    </div>   
        `;
        })
       return postHTML;     
}



function generateADD(){
    return `<div class='newPostDiv'> 
    <img class='gram-post' src="images/norris2.jpg" width='350' height='350'/>
    <textarea maxlength="40" placeholder="Picture Description" id="description-input" onkeyup="this.value = this.value.replace(/[<>]/g, '')"></textarea>
    <button id="addPhoto-btn">ADD</button>
     </div> `
}

function render(){
   container.innerHTML = generatePost()
}

function renderAdd(){
    container.innerHTML = generateADD()
    const addPhotoBTN = document.getElementById('addPhoto-btn')
    const descriptionInput = document.getElementById('description-input')
    addPhotoBTN.addEventListener('click', function(){
    if(descriptionInput.value){
    posts.unshift({
        name: "Chuck Norris",
        username: "ChuckNorris",
        location: "World, Earth",
        avatar: "images/chucknorris.jpeg",
        post: "images/norris2.jpg",
        comment: `${descriptionInput.value}`,
        likes: 0,
         replies: [],
        id: "4",
        isLiked: false
    })
    render()}
})
}

render()