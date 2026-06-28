function ImageHolder() {
    return(
        <div className="flex flex-col w-1/4 min-h-32 bg-slate-100 rounded-3xl">
            <img 
            src="src/assets/AGS_Image.jpg"
            alt="AGS"
            className="w-full h-[480px] object-cover object-bottom rounded-3xl"
            />
            <p className="text-center font-sans text-2xl font-semibold">Title</p>
        </div>
    )
}

export default ImageHolder;