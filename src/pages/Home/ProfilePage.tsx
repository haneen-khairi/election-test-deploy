import Profile from './Profile'
import { Box } from '@chakra-ui/react'
export default function ProfilePage() {
  return (
    <Box pt={'40px'} mb={'16px'} >
      <img className='profile__page--logo' src="/logo-favi.svg" alt="" />
      <Profile 
        img='/profile.svg' 
        title='ياسر أحمد علي'
        description='هنالك العديد من الأنواع المتوفرة لنصوص لوريم إيبسوم، ولكن الغالبية تم تعديلها بشكل ما عبر إدخال بعض النوادر أو الكلمات العشوائية إلى النص.'
        />
        <div className="profile__page--qr">
          <img src="/qr.svg" alt="" />
        </div>
    </Box>
  )
}
