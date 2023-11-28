import { CreateCommunity } from "./_components/CreateCommunity"

const CreateCommunityPage = () => {
    return (
        <section className='flex flex-col justify-center p-12 md:max-w-2xl mx-auto gap-5'>
            <div className='border-b font-bold'>
                Create a community
            </div>

            <CreateCommunity />
        </section>
    )
}

export default CreateCommunityPage