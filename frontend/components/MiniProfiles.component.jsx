import MiniProfile from "./MiniProfile.component";

const MiniProfiles = ({ miniProfiles }) => {
  return (
    <div className=" mx-auto grid grid-cols-1 md:max-w-2xl md:grid-cols-2 gap-3 xl:gap-y-6 xl:gap-x-32 xl:grid-cols-3 xl:max-w-4xl justify-items-center mt-5">
      {miniProfiles &&
        miniProfiles.map((miniProfile) => {
          return <MiniProfile key={miniProfile.id} {...miniProfile} />;
        })}
    </div>
  );
};

export default MiniProfiles;
