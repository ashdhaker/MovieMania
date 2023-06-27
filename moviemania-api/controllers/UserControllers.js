const User = require('../models/UserModel');

module.exports.getLikedMovies = async (req,res)=>{
    try{
        const {email}=req.params;
        const user= await User.findOne({email});
        
        // console.log(email);
        if(user){
            // console.log(user.likedMovies);
            return res.json({ msg: "success", movies: user.likedMovies });
        }else return req.json({msg: "user with given email not found"});
        
    }catch(err){
        return res.json({msg: "error fetching movies"});
    }
}

module.exports.addToLikedMovies = async (req,res)=>{
    try{
        
        const {email,data}=req.body;
        // console.log(email);
        // console.log(data);
        const user = await User.findOne({email});
        
        if(user){
            const {likedMovies}=user;
            const movieAlreadyLiked=likedMovies.find(({id})=>
                id===data.id
            );
            
            // console.log(movieAlreadyLiked);
            if(!movieAlreadyLiked){
                await User.findByIdAndUpdate(
                    user._id,
                    {
                        likedMovies: [...user.likedMovies,data],
                    },
                    {new: true}
                );
            }else return res.json({msg:"Message already added to the liked list."});
            
        }else{
            await User.create({email,likedMovies:[data]});
        }
        
        return res.json({msg: "Movie Added Succesfully"});
        
    }catch(error){
        return res.json({msg: "Error adding movie"});
    }
};

module.exports.removeFromLikedMovies = async (req,res) => {
    try{
        const {email,movieId}=req.body;
        // console.log(email);
        // console.log(data);
        const user = await User.findOne({email});
        
        if(user){
            const {likedMovies}=user;
            const movieIndex=likedMovies.findIndex(({id})=>
                id===movieId
            );
            
            if(!movieIndex) return res.status(400).send({msg:"Movie Not found"});
            
            likedMovies.splice(movieIndex,1);
            await User.findByIdAndUpdate(
                user._id,
                {
                    likedMovies,
                },
                {new: true}
            );
            return res.json({msg:"Movie Deleted",movies: likedMovies});
        }
        return res.json({msg:"Movie Deleted",movies: likedMovies});
    }catch(err){
        return res.json({msg: "Error deleting movie"});
    }
}

