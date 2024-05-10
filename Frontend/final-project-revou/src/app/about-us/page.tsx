import Footer_vmhb from "@/components/Footer_vmhb";
import GroupProfile from "@/components/GroupProfile";
import NavbarWrapper from "@/components/NavbarWrapper";
import ProjectProfile from "@/components/ProjectProfile";

export default function AboutUs() {
  return (
    <div className="xl:container px-2">
      <NavbarWrapper />
      <ProjectProfile />
      <div className="px-3">
        <GroupProfile />
      </div>
      <Footer_vmhb />
    </div>
  );
}
