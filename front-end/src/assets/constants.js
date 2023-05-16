import { HiOutlineHome, HiOutlineUserGroup } from 'react-icons/hi';
import { AiOutlineHeart, AiOutlineBarChart } from 'react-icons/ai';
import { RiLoginBoxFill } from 'react-icons/ri';

export const links = [
  { name: 'Home', to: '/', icon: HiOutlineHome },
  { name: 'My Favorite Songs', to: '/my-favorite/:id', icon: AiOutlineHeart },
  { name: 'Top Charts', to: '/top-charts', icon: AiOutlineBarChart },
  { name: 'Login', to: '/around-you', icon: RiLoginBoxFill },
  { name: 'Register', to: '/top-artists', icon: HiOutlineUserGroup },
];
