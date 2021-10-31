from pathlib import Path


class localFileTree:
    local_tree_list = []
    remote_tree_list = []

    def print_tree(self, patha):
        path = patha
        self.generate_tree(Path(path), 0)
        return self.remote_tree_list, self.local_tree_list

    def generate_tree(self, pathname, n=0):
        if pathname.is_file():
            str_pathname = str(pathname).replace("\\", "/")
            # str_pathname = str_pathname.replace("\\", "/")
            self.remote_tree_list.append(str_pathname[4:])
            str_pathname = "./" + str_pathname
            self.local_tree_list.append(str_pathname)

        elif pathname.is_dir():
            for cp in pathname.iterdir():
                self.generate_tree(cp, n + 1)
