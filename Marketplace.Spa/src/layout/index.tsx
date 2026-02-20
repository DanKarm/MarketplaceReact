import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "./style.module.scss"
interface Props {
    children: React.ReactNode;
}
const Loyout  = ({children}:Props) =>{
    return (
        <div className={styles.layout}>
            <Header/>
            <div className={styles.content}>{children}</div>
            <Footer/>
        </div>
    )
}
export default Loyout;