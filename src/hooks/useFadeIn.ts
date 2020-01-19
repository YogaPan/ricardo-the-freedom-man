import { useSpring } from 'react-spring'

export default function() {
  return useSpring({
    config: { duration: 1000 },
    delay: 1000,
    from: { opacity: 0, transform: 'translateY(10px)' },
    opacity: 1,
    transform: 'translateY(0)'
  })
}
