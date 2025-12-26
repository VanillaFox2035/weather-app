import { useEffect, useRef } from "react";
import "./DropdownMenu.css";

export interface IDropDownOptions {
    name: string;
    link: string;
}

interface IDropdownMenu
{    
    options: IDropDownOptions[];
    onblur: Function;
}

export default function DropdownMenu(props: IDropdownMenu) 
{
    const options = props.options;
    const ref = useRef(null) as any;
    // Set to close menu if click outside
    useEffect(() => {
        function ClickOutside(event: any) {
            if (ref.current && !ref.current.contains(event.target)) 
            {
                props.onblur();
            }
        }
        document.addEventListener("mousedown", ClickOutside);
        return () => {
            document.removeEventListener("mousedown", ClickOutside);
        }
    }, [ref]);

    return (
        <div ref={ref} className="dropdown-menu" onBlur={() => {console.log("blur"); props.onblur();}}>
            {
                options.map((value) =>
                    <a className="dropdown-menu-option" key={"option" + value.name} href={value.link}>{value.name}</a> 
                )
            }
        </div>
    );
}