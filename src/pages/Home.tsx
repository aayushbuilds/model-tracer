import {useState} from 'react';
import {Header} from "@/components/Header";
import SearchBar from '@/components/SearchBar';
import StatusTable from "@/components/StatusTable";
import ModelsList from '@/components/ModelsList';
import ShamelessRaindropPlug from "@/components/ShamelessRaindropPlug";

export default function Home() {
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = (value: string) => {
        console.log('Searching for:', value);
    };

    return (
        <div
            className="flex h-screen relative px-9 pt-[37px] min-h-screen bg-[#FDFDFD] bg-[radial-gradient(#f3f3f3_1px,transparent_1px)] bg-[length:24px_24px]">

            <div className="flex-1 flex flex-col">
                <Header title={"WEIGHTS ISSUE"} subtitle={"OR SKILL ISSUE"}/>

                <ShamelessRaindropPlug/>

                <div className=" mt-2 flex flex-row align-top gap-8">
                    <div className="w-[60%]">
                        <SearchBar
                            value={searchValue}
                            onChange={setSearchValue}
                            onSearch={handleSearch}
                        />
                        <div className="mt-20 w-full flex items-center justify-center px-2">
              <span className="text-[#7a7a7a] text-center px-25">
                If you believe an AI has worsened in quality, or isn&#39;t performing good, check here, and we will tell you if everyone&#39;s having the problem or just you.
              </span>
                        </div>
                    </div>
                    <div className="w-[45%]">
                        <span>LATEST REPORTS</span>
                        <div className={"h-2"}></div>
                        <StatusTable/>
                    </div>
                </div>

                <div id="models-section" className="mt-8">
                    <ModelsList/>
                </div>
            </div>
        </div>
    );
}
