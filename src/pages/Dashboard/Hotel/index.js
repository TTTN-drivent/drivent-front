import useListRoom from '../../../hooks/api/useListRoom';

export default function Hotel() {
  console.log(useListRoom(3));
  return 'Hotel: Em breve!';
}
