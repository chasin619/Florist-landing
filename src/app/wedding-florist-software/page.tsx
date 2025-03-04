import Hero from "../../components/hero";
import Pricing from "../../components/pricing";
import Footer from "../../components/footer";
import PreFooter from "../../components/prefooter";
import BuildPipeline from "../../components/pipeline";
import ModalProvider from "../../components/common/modalProvider";

export const metadata = {
    title: "Wedding Florist Software",
    description: "Best software for wedding florists",
};

export default function App() {
    return (
        <div className="w-[100%] m-auto overflow-hidden">

            <Hero />
            <BuildPipeline />
            <Pricing />
            <PreFooter />
            <Footer />

            <ModalProvider />
        </div>
    );
}
