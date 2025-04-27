import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import  ModeToggle  from "./ModeToggle";

const Nav = () => {
  
  return (
    <nav className=" container flex items-center justify-around mt-3.5">
      <ModeToggle />
      <SignedIn>
        <UserButton afterSignOutUrl={'/sign-in'}/>
      </SignedIn>
      <SignedOut>
        NextTodo
      </SignedOut>
      
    </nav>
  );
};

export default Nav;
