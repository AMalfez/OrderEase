const page = ({ params }: { params: { slug: string } })=>{
    return(
        <div>Hi {params.slug}</div>
    )
}
export default page;