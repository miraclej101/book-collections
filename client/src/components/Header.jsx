import { useEffect, useState } from 'react';

export default function Header(props) {
    const { image, color, height, title } = props;
    const [style, setStyle] = useState({
                            width:'100vw',
                            height:`${height}`,  
                        });
    useEffect(() => {
        image === null ? 
            setStyle({...style, backgroundColor: color !== null ? color : 'grey'})
            :
            setStyle({...style, backgroundImage: `url(${image})`,
                backgroundRepeat: 'repeat-x',
                backgroundPositionX: 'left'
            })
    }, [])
    return (
        <header style={style}>
            <div className="p-5 text-center m-5">
                <h1 className="fw-bolder text-white">{title}</h1>
            </div>
        </header>
    )
}
