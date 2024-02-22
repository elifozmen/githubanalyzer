import logo1 from './/logo.png'


export default function Navbar() {
    return (
    <div className="navbar">
    
    

    <div className="nav-list">
        <div className="logo">
            <img
                src={logo1}
                width={70}
                height={70}
            />
        </div>
    <div className="nav-item"> <a href="/"> GitHub Analyzer </a>
        </div>
        <div className="nav-item"> <a href="/categories"> Developer Categories </a>
        </div>

         <div className="nav-item"> <a href="/compatibility"> Compatibility </a> 
         </div>
         
        <div className="nav-item"> <a href="/workload"> Workload Distribution </a> 
        </div>

        <div className="nav-item"> <a href="/info"> Info </a> 
        </div>  
        </div>
    </div>

)
}