import Footer from '@/app/components/Footer/footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import Link from "next/link";
import Icon from "/public/images/Icon-help.png";

function page() {
  return (
    <div className='w-full'>
{/*Heading*/}
        <div className='pt-[5%] bg-[#B9DEB7]'>
          <div className='p-10 bg-[#B9DEB7] flex flex-row grid-cols-2 justify-between'>

              <div className='px-10 pt-5 '>
                <h1 className='font-poppins font-semibold lg:text-[36px] md:text-[28px] text-[24xpx] '>Welcome to AGreen Nature Connect’s Help Center </h1>
                <p className=' font-poppins lg:text-[24px] md:text-[20px] text-[16px] py-5'>How can we help you today?</p>

              </div>

              <div className=' '>
                <Image
                            className="lg:block hidden rounded-lg pt-3"
                            src={Icon}
                            alt="Icon-help.png"
                            width={350}/>

              </div>
      
          </div>

        </div>


{/*FAQ's*/}
        <div id="DISCUSSION FORUM SECTION" className='md:p-10 p-5'>
          <div className=''>
            <h1 className='font-poppins font-bold md:text-[36px] sm:text-[24px] text-[16px] md:pb-10 pb-10 '>FREQUENTLY ASKED QUESTIONS</h1>
          </div> 
          <div className='mb-5 md:text-[16px] text-14'>
            <div className='md:px-5'>
              <h1 className='font-poppins font-bold md:text-[32px] sm:text-[24px] text-[15px]'>Discussion Forum Section</h1>
            </div>
            <Accordion type="single" collapsible className="w-full md:px-20 md:text-[18px] sm:text-[14] text-[12px] ">
                <AccordionItem value="item-1" className=''>
                    <AccordionTrigger className='font-poppins text-left'>How to report a post?</AccordionTrigger>
                        <AccordionContent className='text-[16px] font-extralight'>
                        -	To report a post, the user should view the specific post then click the three-dot button or ellipsis menu at the upper right of the page. Next, select the reason for reporting the post.  After clicking, the system will show that the user is reported.
                        </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger className='font-poppins text-left'>Unable to post, react, and interact with other users.</AccordionTrigger>
                        <AccordionContent className='text-[17px] font-extralight'>
                        -	Users are required to login their accounts before doing interactions such as react, comment, and share. Users with no account should create one through registration.
                        </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger className='font-poppins text-left'>How to create a post or discussion thread?</AccordionTrigger>
                      <AccordionContent className='text-[16px] font-extralight'>
                       -	To create post, go to home click the ‘Create’ button at the upper right, choose topic of your post by selecting at the drag down list, after that create tittle and write your post. Click Post and you’re done!
                      </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger className='font-poppins text-left'>How to edit or delete my own post?</AccordionTrigger>
                      <AccordionContent className='text-[16px] font-extralight'>
                      -	To delete a post, the user should view the specific post then click the three-dot button or ellipsis menu at the upper right of the page.  After clicking delete, it will ask you if you are sure of the deletion of the post.
                      </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                    <AccordionTrigger className='font-poppins text-left'>Is my personal information secure on AGreen Nature Connect?</AccordionTrigger>
                      <AccordionContent className='text-[16px] font-extralight'>
                      -	Yes, we take the privacy and security of our users' information seriously. We employ industry-standard security measures to safeguard your personal data and adhere to strict privacy policies.
                      </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6">
                    <AccordionTrigger className='font-poppins text-left'>Who are the people I interact in the discussion forum?</AccordionTrigger>
                      <AccordionContent className='text-[16px] font-extralight'>
                      -	People you encounter on the discussion forum are residents, farmers, and community staff. Everyone is encourage to interact to share insights and experiences.
                      </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-7">
                    <AccordionTrigger className='font-poppins text-left'>How to communicate with other members and community staff??</AccordionTrigger>
                      <AccordionContent className='text-[16px] font-extralight'>
                      -	Aside from contacts, you can reach them by chatting them through live chat. Just click the message icon beside the notification button. 
                       </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-8">
                    <AccordionTrigger className='font-poppins text-left'>Is Discussion Forum active the entire time?</AccordionTrigger>
                      <AccordionContent className='text-[16px] font-extralight'>
                      -	Yes, you can interact with other users continuously while for staff/employee, they can only accommodate during working hours.
                      </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-9">
                    <AccordionTrigger className='font-poppins text-left'>What actions are not allowed in the section?</AccordionTrigger>
                      <AccordionContent className='text-[16px] font-extralight'>
                      -	Users are not allowed to post or comment unrelated content. Also, users are not allowed to use vulgar or impolite words. Agreen Nature Connect is a place where we implement respect and kindness to each other. Doing obscene and rude actions are considered violators.
                      </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-10">
                    <AccordionTrigger className='font-poppins text-left'>Punishment for violators</AccordionTrigger>
                      <AccordionContent className='text-[16px] font-extralight'>
                      -	For users who violate rules, they will be receiving warning. After thrice attempt of violation, the user will be permanently banned.
                     </AccordionContent>
                </AccordionItem>
            </Accordion>
          </div>
          <div className='mb-5'>
            <div className='md:px-5'>
              <h1 className='font-poppins font-bold md:text-[32px] sm:text-[24px] text-[15px]'>Market Hub Section</h1>
            </div>
            <Accordion type="single" collapsible className="w-full md:px-20 md:text-[18px] sm:text-[14] text-[12px]  ">
                <AccordionItem value="item-1" className=''>
                    <AccordionTrigger className='font-poppins text-left'>How to cancel order? </AccordionTrigger>
                        <AccordionContent className='text-[16px] font-extralight'>
                        -	You can cancel your order by clicking your “my order” section, located at the upper right beside the message icon. Click the cancel button then choose the reason for the cancellation of your order. After that, the system will show that the product was successfully cancelled.
                        </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger className='font-poppins text-left'>Method for order</AccordionTrigger>
                        <AccordionContent className='text-[17px] font-extralight'>
                        -	All transactions are processed in markethub section. Posting request of order, getting order through live chat and other ways of interaction are not allowed.
                        </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger className='font-poppins text-left'>Unable to order </AccordionTrigger>
                      <AccordionContent className='text-[16px] font-extralight'>
                      -	Users are required to login their accounts before purchasing product. Users with no account should create one through registration.
                      </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger className='font-poppins text-left'>How to track my order status? </AccordionTrigger>
                      <AccordionContent className='text-[16px] font-extralight'>
                      -	To Monitor your order status, navigate the ‘Transaction history’ Icon at the upper right corner and click it, it will direct you to your order status.
                      </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                    <AccordionTrigger className='font-poppins text-left'>What payment methods are accepted? </AccordionTrigger>
                      <AccordionContent className='text-[16px] font-extralight'>
                      -	We accept Cash on delivery (COD) and GCash.
                      </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6" className=''>
                    <AccordionTrigger className='font-poppins text-left'>When are free products usually available?</AccordionTrigger>
                        <AccordionContent className='text-[16px] font-extralight'>
                        -	We don’t provide specific dates for the availability of free products. It us up to the community admin to decide because it will depend on the production.
                        </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-7">
                    <AccordionTrigger className='font-poppins text-left'>What time will the products be delivered? </AccordionTrigger>
                        <AccordionContent className='text-[17px] font-extralight'>
                        -	Once the staff has arranged for shipment. The product will be delivered right away.
                        </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-8">
                    <AccordionTrigger className='font-poppins text-left'>How are refunds handled? </AccordionTrigger>
                      <AccordionContent className='text-[16px] font-extralight'>
                      -	Refunds depends on the situation. You can contact the community staff for further information through phone and email. Make sure to carefully review your orders before purchasing to avoid complications.
                      </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-9">
                    <AccordionTrigger className='font-poppins text-left'>How do you price your products? </AccordionTrigger>
                      <AccordionContent className='text-[16px] font-extralight'>
                      -	The price of our products depends on season which is carefully monitored just like other markets. We offer quality products with affordable price. 
                      </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-10">
                    <AccordionTrigger className='font-poppins text-left'>What if my order arrives damaged? </AccordionTrigger>
                      <AccordionContent className='text-[16px] font-extralight'>
                      -	For concerns regarding your orders. You can contact the community staff through phone and email indicated in our system.
                      </AccordionContent>
                </AccordionItem>
            </Accordion>
          </div>
          <div className='mb-5'>
            <div className='md:px-5'>
              <h1 className='font-poppins font-bold md:text-[32px] sm:text-[24px] text-[15px]'>Information Section</h1>
            </div>
            <Accordion type="single" collapsible className="w-full md:px-20 md:text-[18px] sm:text-[14] text-[12px]  ">
                <AccordionItem value="item-1" className=''>
                    <AccordionTrigger className='font-poppins text-left'>Learning tools used </AccordionTrigger>
                        <AccordionContent className='text-[16px] font-extralight'>
                        -	For educational purposes, Agreen Nature Connect uses video tutorials for step by step instructions, learning materials for guide or learning process, and blogs for sharing of thoughts and experiences with other users.
                        </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger className='font-poppins text-left'>Can users publish or upload file for video tutorials, learning materials, and blogs? </AccordionTrigger>
                        <AccordionContent className='text-[17px] font-extralight'>
                        -	No, only employee/staff can do the said action.
                        </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger className='font-poppins text-left'>Can users download the files or videos provided in the read & learn section? </AccordionTrigger>
                      <AccordionContent className='text-[16px] font-extralight'>
                      -	Yes, you can download the selected file or video once you view it.
                      </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger className='font-poppins text-left'>How to view learning tools in different barangay communities? </AccordionTrigger>
                      <AccordionContent className='text-[16px] font-extralight'>
                      -	You can explore different learning tools in different communities by simply choosing your desired community in the dropdown button which is located at the upper right of the screen.
                      </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                    <AccordionTrigger className='font-poppins text-left'>Content of learning tools </AccordionTrigger>
                      <AccordionContent className='text-[16px] font-extralight'>
                      -	Agreen Nature Connect prioritize sharing facts and information about urban farming. All provided learning tools only tackles or discusses concerning with urban farming. Other unrelated topics are not allowed.
                      </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6" className=''>
                    <AccordionTrigger className='font-poppins text-left'>Report published file or video </AccordionTrigger>
                        <AccordionContent className='text-[16px] font-extralight'>
                        -	All files and videos are carefully reviewed and monitored by the employees and admin. Rest assured that the quality of learning tools presented in the page are exceptional and educational.
                        </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-7">
                    <AccordionTrigger className='font-poppins text-left'>Language used for learning tools </AccordionTrigger>
                        <AccordionContent className='text-[17px] font-extralight'>
                        -	Agreen Nature Connect user interface is currently available in Tagalog and English language.
                        </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-8">
                    <AccordionTrigger className='font-poppins text-left'>Charge for viewing learning tools </AccordionTrigger>
                      <AccordionContent className='text-[16px] font-extralight'>
                      All learning tools published on video tutorials, learning materials, and blogs are free.
                      </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-9">
                    <AccordionTrigger className='font-poppins text-left'>Do we need to install anything? </AccordionTrigger>
                      <AccordionContent className='text-[16px] font-extralight'>
                      -	No installation is required. Just make sure you have stable internet connection for your web browser.
                      </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-10">
                    <AccordionTrigger className='font-poppins text-left'>Who can view our learning tools? </AccordionTrigger>
                      <AccordionContent className='text-[16px] font-extralight'>
                      -	Learning tools are open to everyone. Residents, students, and other people who have interest in urban farming are welcome to visit and view our learning tools.
                      </AccordionContent>
                </AccordionItem>
            </Accordion>
          </div>
        </div>

        


{/*InTouch*/}
<div className='w-full bg-[#B9DEB7] justify-center p-10 '>
      <div className='flex flex-row justify-center mx-60 p-10 shadow-sm shadow-black rounded-3xl bg-white'>
          <div className='px-5'>
              <h1 className='font-poppins font-bold text-[24px] pb-3'>Still have a questions?</h1>
              <p className='text-[16px]'>Couldn’t find what you needed,our friendly support team is here to help.</p>
            </div>
            <div className='mt-7 px-10'>
              <Link href="/about/Contact"
              className=" text-black font-mono font-semibold bg-amber hover:bg-pale w-[160px] mt-10 md:p-3 p-3 border-none rounded-full text-center">
              Get in Touch
              </Link>
            </div>
        </div> 
    </div>

{/*Footer*/}
        <div className='border-t border-black'>
          <footer>
              <Footer />
          </footer> 
        </div>
    </div>
   )
}

export default page