import { ConnectKitButton } from "connectkit";

// const navigation = [{ name: "Product", href: "#" }];

export default function Navbar() {
  return (
    <header className="bg-white">
      <nav
        className="mx-auto flex container  items-center justify-between p-6 px-8"
        aria-label="Global"
      >
        <div className="flex flex-1">
          <a href="#" className="flex items-center gap-2 -m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
            <div className="">GHO Bridge</div>
          </a>
        </div>
        {/* <div className="flex gap-x-12">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              {item.name}
            </a>
          ))}
        </div> */}
        <div className="flex flex-1 justify-end">
          <ConnectKitButton />
        </div>
      </nav>
    </header>
  );
}
